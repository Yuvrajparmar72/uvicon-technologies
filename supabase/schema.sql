-- ============================================================================
-- UVICON TECHNOLOGIES — SUPABASE DATABASE SCHEMA
-- Purpose: Handles all client-facing forms and submissions
-- Tables:
--   1. contact_inquiries       (Contact Page Detailed Inquiry Form)
--   2. callback_requests       (Footer Quick "Request Call" Form)
--   3. testimonials            (Home Page "Write a Review" Modal Form)
--   4. newsletter_subscribers  (Blog Weekly Architectural Dispatch Subscription)
--   5. quote_estimates         (Pricing Interactive Cost Calculator Estimates)
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 0. HELPER FUNCTIONS & TRIGGERS (Auto-update updated_at timestamp)
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. CONTACT INQUIRIES TABLE
-- Used by: /contact (ContactClient.tsx)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service_category TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    timeline TEXT NOT NULL,
    requirements TEXT NOT NULL,
    request_nda BOOLEAN DEFAULT TRUE,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_discussion', 'proposal_sent', 'closed_won', 'closed_lost')),
    admin_notes TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for fast search and admin queries
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON public.contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON public.contact_inquiries(created_at DESC);

-- Trigger for auto-updating updated_at
DROP TRIGGER IF EXISTS trigger_contact_inquiries_updated_at ON public.contact_inquiries;
CREATE TRIGGER trigger_contact_inquiries_updated_at
    BEFORE UPDATE ON public.contact_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2. CALLBACK REQUESTS TABLE
-- Used by: Footer "Have a Question? Let's Talk." (Footer.tsx)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.callback_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_info TEXT NOT NULL, -- Email or phone number entered by user
    source_url TEXT DEFAULT '/',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'resolved', 'spam')),
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_callback_requests_status ON public.callback_requests(status);
CREATE INDEX IF NOT EXISTS idx_callback_requests_created_at ON public.callback_requests(created_at DESC);

DROP TRIGGER IF EXISTS trigger_callback_requests_updated_at ON public.callback_requests;
CREATE TRIGGER trigger_callback_requests_updated_at
    BEFORE UPDATE ON public.callback_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 3. TESTIMONIALS & REVIEWS TABLE
-- Used by: Home Page "Write a Review" Modal (TestimonialsSection.tsx)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    company TEXT,
    project_type TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);

DROP TRIGGER IF EXISTS trigger_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER trigger_testimonials_updated_at
    BEFORE UPDATE ON public.testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. NEWSLETTER SUBSCRIBERS TABLE
-- Used by: Blog Page "Weekly Architectural Dispatch" (BlogClient.tsx)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    source TEXT DEFAULT 'blog_footer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_is_active ON public.newsletter_subscribers(is_active);

-- ============================================================================
-- 5. QUOTE ESTIMATES TABLE
-- Used by: Pricing Page Interactive Cost Calculator (CostCalculatorModal.tsx)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.quote_estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_type TEXT,
    phase TEXT,
    platform TEXT,
    design_level TEXT,
    features TEXT[] DEFAULT ARRAY[]::TEXT[],
    min_estimate NUMERIC(12, 2) NOT NULL DEFAULT 0,
    max_estimate NUMERIC(12, 2) NOT NULL DEFAULT 0,
    client_email TEXT,
    client_name TEXT,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'converted_to_lead', 'abandoned')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quote_estimates_created_at ON public.quote_estimates(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Ensures visitors can ONLY submit forms, and cannot read other visitors' data.
-- ============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_estimates ENABLE ROW LEVEL SECURITY;

-- 2. CONTACT INQUIRIES POLICIES
-- Allow any public visitor (anon) to submit a contact inquiry
CREATE POLICY "Allow public insert into contact_inquiries"
    ON public.contact_inquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 3. CALLBACK REQUESTS POLICIES
-- Allow any public visitor (anon) to request a call back
CREATE POLICY "Allow public insert into callback_requests"
    ON public.callback_requests
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 4. TESTIMONIALS POLICIES
-- Allow any public visitor (anon) to submit a review (defaults to 'pending')
CREATE POLICY "Allow public insert into testimonials"
    ON public.testimonials
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (status = 'pending');

-- Allow public visitors to read ONLY approved reviews on the website
CREATE POLICY "Allow public read of approved testimonials"
    ON public.testimonials
    FOR SELECT
    TO anon, authenticated
    USING (status = 'approved');

-- 5. NEWSLETTER SUBSCRIBERS POLICIES
-- Allow public visitors to subscribe to the newsletter
CREATE POLICY "Allow public insert into newsletter_subscribers"
    ON public.newsletter_subscribers
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 6. QUOTE ESTIMATES POLICIES
-- Allow public visitors to save an estimate
CREATE POLICY "Allow public insert into quote_estimates"
    ON public.quote_estimates
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- 7. SERVICE ROLE / ADMIN FULL ACCESS (Bypasses RLS by default in Supabase,
-- but explicit policies ensure security if authenticated admin role is used)
CREATE POLICY "Allow full access to service_role on contact_inquiries"
    ON public.contact_inquiries TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access to service_role on callback_requests"
    ON public.callback_requests TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access to service_role on testimonials"
    ON public.testimonials TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access to service_role on newsletter_subscribers"
    ON public.newsletter_subscribers TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "Allow full access to service_role on quote_estimates"
    ON public.quote_estimates TO service_role USING (true) WITH CHECK (true);

-- ============================================================================
-- 8. LIGHTWEIGHT SINGLE-ROW DAILY SITE METRICS TABLE
-- Purpose: 100% Zero-Load aggregated page views & top page per day.
-- Instead of millions of rows, exactly 1 row per day is maintained.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.site_metrics (
    date DATE PRIMARY KEY DEFAULT CURRENT_DATE,
    total_views INTEGER NOT NULL DEFAULT 1,
    unique_visitors INTEGER NOT NULL DEFAULT 1,
    page_counts JSONB NOT NULL DEFAULT '{}'::jsonb,
    top_page TEXT NOT NULL DEFAULT '/',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read site_metrics"
    ON public.site_metrics FOR SELECT
    TO anon, authenticated, service_role
    USING (true);

CREATE POLICY "Allow public all access on site_metrics"
    ON public.site_metrics FOR ALL
    TO anon, authenticated, service_role
    USING (true)
    WITH CHECK (true);

-- Atomic stored procedure to record page views with zero overhead
CREATE OR REPLACE FUNCTION public.record_page_view(p_path TEXT, p_is_new_session BOOLEAN DEFAULT FALSE)
RETURNS VOID AS $$
DECLARE
    today_date DATE := CURRENT_DATE;
    clean_path TEXT := COALESCE(NULLIF(p_path, ''), '/');
BEGIN
    INSERT INTO public.site_metrics (date, total_views, unique_visitors, page_counts, top_page, updated_at)
    VALUES (
        today_date,
        1,
        CASE WHEN p_is_new_session THEN 1 ELSE 0 END,
        jsonb_build_object(clean_path, 1),
        clean_path,
        NOW()
    )
    ON CONFLICT (date) DO UPDATE
    SET 
        total_views = site_metrics.total_views + 1,
        unique_visitors = site_metrics.unique_visitors + (CASE WHEN p_is_new_session THEN 1 ELSE 0 END),
        page_counts = jsonb_set(
            site_metrics.page_counts,
            ARRAY[clean_path],
            to_jsonb(COALESCE((site_metrics.page_counts->>clean_path)::int, 0) + 1),
            true
        ),
        updated_at = NOW();

    -- Automatically select and update top_page based on maximum views today
    UPDATE public.site_metrics
    SET top_page = (
        SELECT key FROM jsonb_each_text(page_counts)
        ORDER BY value::int DESC LIMIT 1
    )
    WHERE date = today_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

