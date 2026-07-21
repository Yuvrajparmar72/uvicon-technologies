import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-[32px]"
           style={{
             background: 'rgba(255, 255, 255, 0.03)',
             backdropFilter: 'blur(24px) saturate(180%)',
             border: '1px solid rgba(255, 255, 255, 0.08)',
             borderTop: '1px solid rgba(255, 255, 255, 0.15)',
             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
           }}
      >
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
          <h1 className="text-3xl font-bold tracking-wider font-[family-name:var(--font-heading-main)] text-white">
            WELCOME BACK
          </h1>
          <p className="text-gray-400 font-[family-name:var(--font-body)] mt-2 text-center">
            Log in to your Uvicon account to continue
          </p>
        </div>

        <form className="flex flex-col gap-5 font-[family-name:var(--font-body)]">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FFC050] focus:ring-1 focus:ring-[#FFC050] transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FFC050] focus:ring-1 focus:ring-[#FFC050] transition-all"
            />
          </div>
          
          <div className="flex items-center justify-between mt-[-5px] text-sm">
            <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded bg-white/10 border border-white/20 accent-[#FFC050]" />
              Remember me
            </label>
            <Link href="#" className="text-[#FFC050] hover:text-white transition-colors">Forgot Password?</Link>
          </div>

          <button type="button" className="w-full h-12 mt-2 bg-gradient-to-r from-[#FFC050] to-[#E6A639] hover:opacity-90 text-[#003D3F] font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,192,80,0.3)]">
            Login <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4 before:flex-1 before:h-px before:bg-white/10 after:flex-1 after:h-px after:bg-white/10">
          <span className="text-gray-400 text-sm font-[family-name:var(--font-body)]">OR</span>
        </div>

        <button type="button" className="w-full h-12 mt-6 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl flex items-center justify-center gap-3 transition-all font-[family-name:var(--font-body)]">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          Continue with Github
        </button>

        <p className="mt-8 text-center text-gray-400 text-sm font-[family-name:var(--font-body)]">
          Don't have an account? <Link href="/signup" className="text-[#FFC050] hover:text-white font-semibold transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
