import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Terminal, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authApi } from '../../services/adminApi';
import { setToken, isAuthenticated } from '../../lib/auth';
import { useEffect } from 'react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated()) navigate({ to: '/admin/dashboard' });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await authApi.login(email, password);
      setToken(token);
      navigate({ to: '/admin/dashboard' });
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #1A56FF12 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />
      <div className="relative w-full max-w-sm">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#1A56FF] rounded-xl flex items-center justify-center">
            <Terminal size={20} className="text-white" />
          </div>
          <div>
            <p className="font-mono text-white font-bold text-lg leading-none">CodeSidney</p>
            <p className="font-mono text-[#4A5568] text-xs mt-0.5">Admin Panel</p>
          </div>
        </div>

        <div className="bg-[#13131F] rounded-2xl border border-[#1E1E2E] p-8">
          <h1 className="font-mono text-white text-xl font-bold mb-1">Sign in</h1>
          <p className="font-mono text-[#4A5568] text-sm mb-6">Access your admin dashboard</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={14} className="text-red-400 shrink-0" />
                <span className="font-mono text-red-400 text-xs">{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-[#4A5568]">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-[#0D0D14] border border-[#1E1E2E] rounded-xl pl-9 pr-4 py-3
                             font-mono text-sm text-white placeholder-[#2D2D3E] outline-none
                             focus:border-[#1A56FF] transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs text-[#4A5568]">Password</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4A5568]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0D0D14] border border-[#1E1E2E] rounded-xl pl-9 pr-10 py-3
                             font-mono text-sm text-white placeholder-[#2D2D3E] outline-none
                             focus:border-[#1A56FF] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A56FF] hover:bg-[#0D2DB4] disabled:opacity-50
                         text-white font-mono font-semibold text-sm py-3 rounded-xl
                         transition-colors mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>
        </div>

        <a
          href="/"
          className="block text-center mt-4 font-mono text-xs text-[#4A5568] hover:text-white transition-colors"
        >
          ← Back to portfolio
        </a>
      </div>
    </div>
  );
};

export default AdminLogin;
