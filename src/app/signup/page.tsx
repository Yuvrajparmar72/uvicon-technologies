import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10 my-8">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-surface-alt/60 backdrop-blur-[24px] backdrop-saturate-[180%] border border-border/50 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <Image
              src="/assets/icons/uvicon-technologies-logo.webp"
              alt="Uvicon Technologies"
              width={80}
              height={80}
              className="w-16 h-16 object-contain mb-4 hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="text-3xl font-bold tracking-wider font-[family-name:var(--font-heading-main)] text-text-primary">
            JOIN UVICON
          </h1>
          <p className="text-text-secondary font-[family-name:var(--font-body)] mt-2 text-center">
            Create an account to access our premium ecosystem
          </p>
        </div>

        <form className="flex flex-col gap-4 font-[family-name:var(--font-body)]">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full h-12 pl-12 pr-4 bg-text-primary/5 border border-border/50 rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full h-12 pl-12 pr-4 bg-text-primary/5 border border-border/50 rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full h-12 pl-12 pr-4 bg-text-primary/5 border border-border/50 rounded-xl text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            />
          </div>
          
          <div className="flex items-start gap-2 mt-2 text-sm">
            <input type="checkbox" className="w-4 h-4 mt-0.5 rounded bg-text-primary/10 border border-border/50 accent-brand-accent shrink-0 cursor-pointer" />
            <label className="text-text-secondary cursor-pointer leading-tight">
              I agree to the <Link href="/privacy-policy" className="text-brand-accent hover:text-brand-accent-hover transition-colors">Privacy Policy</Link> and <Link href="/refund-policy" className="text-brand-accent hover:text-brand-accent-hover transition-colors">Terms of Service</Link>.
            </label>
          </div>

          <button type="button" className="w-full h-12 mt-4 bg-gradient-to-r from-brand-accent to-brand-accent-hover hover:opacity-90 text-[#021213] font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,192,80,0.3)]">
            Create Account <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4 before:flex-1 before:h-px before:bg-border/50 after:flex-1 after:h-px after:bg-border/50">
          <span className="text-text-secondary text-sm font-[family-name:var(--font-body)]">OR</span>
        </div>

        <button type="button" className="w-full h-12 mt-6 bg-text-primary/5 border border-border/50 hover:bg-text-primary/10 text-text-primary font-medium rounded-xl flex items-center justify-center gap-3 transition-all font-[family-name:var(--font-body)]">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          Sign up with Github
        </button>

        <p className="mt-8 text-center text-text-secondary text-sm font-[family-name:var(--font-body)]">
          Already have an account? <Link href="/login" className="text-brand-accent hover:text-brand-accent-hover font-semibold transition-colors">Login here</Link>
        </p>
      </div>
    </div>
  );
}
