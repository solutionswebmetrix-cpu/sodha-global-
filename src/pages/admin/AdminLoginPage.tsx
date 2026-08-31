import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRouter } from '@/hooks/useRouter';
import Logo from '@/components/Logo';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const { signIn } = useAdminAuth();
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: signInError } = await signIn(email.trim(), password);
    if (signInError) {
      setError(signInError);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal-950 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex flex-col items-center">
              <span className="font-display text-3xl font-bold text-ivory-50">SODHA</span>
              <span className="text-[0.6rem] font-medium uppercase tracking-[0.4em] text-copper-400">
                Global
              </span>
            </div>
          </div>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-charcoal-800 mx-auto">
            <Lock className="h-7 w-7 text-copper-400" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ivory-50">Admin Access</h1>
          <p className="mt-2 text-sm text-ivory-200/50">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-charcoal-900 p-6 sm:p-8">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ivory-200/70">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ivory-200/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800 py-3 pl-11 pr-4 text-sm text-ivory-50 placeholder:text-ivory-200/30 focus:border-copper-500 focus:outline-none focus:ring-1 focus:ring-copper-500"
                  placeholder="admin@sodhaglobal.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ivory-200/70">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ivory-200/30" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-charcoal-700 bg-charcoal-800 py-3 pl-11 pr-4 text-sm text-ivory-50 placeholder:text-ivory-200/30 focus:border-copper-500 focus:outline-none focus:ring-1 focus:ring-copper-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-copper-900/30 px-4 py-3 text-sm text-copper-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-copper-600 px-8 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-ivory-50 transition-all hover:bg-copper-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-ivory-50 border-t-transparent" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-ivory-200/30">
          Authorized personnel only. Contact sodhaglobal@gmail.com for access.
        </p>
      </div>
    </div>
  );
}
