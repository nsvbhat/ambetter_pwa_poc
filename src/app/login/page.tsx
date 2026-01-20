'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  isBiometricSupported, 
  authenticateWithBiometric,
  registerBiometric,
  hasBiometricCredentials,
  detectBiometricType
} from '@/lib/biometric-utils';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricLoading, setBiometricLoading] = useState(false);
  const [biometricType, setBiometricType] = useState('Biometric');
  const [demoEmail] = useState('john.doe@example.com');
  const [showBiometricSetup, setShowBiometricSetup] = useState(false);
  const [biometricRegistered, setBiometricRegistered] = useState(false);

  useEffect(() => {
    const checkBiometric = async () => {
      const supported = await isBiometricSupported();
      setBiometricAvailable(supported);
      
      if (supported) {
        const type = await detectBiometricType();
        setBiometricType(type);
        const registered = hasBiometricCredentials(demoEmail);
        setBiometricRegistered(registered);
      }
      
      setEmail(demoEmail);
    };
    checkBiometric();
  }, [demoEmail]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email && password.length >= 6) {
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('userEmail', email);
        router.push('/dashboard');
      } else {
        setError('Please enter valid email and password (min 6 characters)');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setBiometricLoading(true);
    setError('');

    try {
      const success = await authenticateWithBiometric(demoEmail);
      if (success) {
        localStorage.setItem('authToken', 'biometric-token-' + Date.now());
        localStorage.setItem('userEmail', demoEmail);
        router.push('/dashboard');
      } else {
        setError('Biometric authentication failed. Please try password login.');
      }
    } catch (err) {
      setError('Biometric unavailable. Please use password login.');
    } finally {
      setBiometricLoading(false);
    }
  };

  const handleBiometricRegister = async () => {
    setBiometricLoading(true);
    setError('');

    try {
      const success = await registerBiometric(demoEmail, demoEmail);
      if (success) {
        setBiometricRegistered(true);
        setShowBiometricSetup(false);
        localStorage.setItem('authToken', 'biometric-token-' + Date.now());
        localStorage.setItem('userEmail', demoEmail);
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setError('Registration cancelled. Use password login instead.');
        setShowBiometricSetup(false);
      }
    } catch (err) {
      setError('Registration failed. Please use password login.');
      setShowBiometricSetup(false);
    } finally {
      setBiometricLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00d4ff] to-[#0099cc] flex items-center justify-center px-4 py-8">
      <Link 
        href="/"
        className="fixed top-4 left-4 bg-white/20 hover:bg-white/30 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all text-xs sm:text-sm flex items-center gap-2 backdrop-blur-sm"
      >
        <span>🏠</span>
        <span className="hidden sm:inline">Home</span>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-white rounded-lg p-3 inline-block mb-4">
            <img src="/Brillio-logo-new.png" alt="Brillio Health" className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Brillio Health</h1>
          <p className="text-gray-200 text-sm sm:text-base">Affordable Health Coverage</p>
        </div>

        <div className="bg-[#252545] rounded-lg shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-[#00d4ff] mb-6">Sign In</h2>

          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-xs sm:text-sm">{error}</p>
            </div>
          )}

          {biometricAvailable && !showBiometricSetup && (
            <>
              {biometricRegistered ? (
                <>
                  <button
                    type="button"
                    onClick={handleBiometricLogin}
                    disabled={biometricLoading}
                    className="w-full mb-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 sm:py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    {biometricLoading ? (
                      <>
                        <span>⏳</span>
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <span>👆</span>
                        <span>Sign In with {biometricType}</span>
                      </>
                    )}
                  </button>

                  <div className="mb-6 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs sm:text-sm text-blue-800 font-medium mb-2">🔒 First Time?</p>
                    <p className="text-xs text-blue-700 mb-3">Set up {biometricType} for faster, more secure login.</p>
                    <button
                      type="button"
                      onClick={() => setShowBiometricSetup(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-xs sm:text-sm"
                    >
                      Set Up {biometricType}
                    </button>
                  </div>

                  <div className="mb-6 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {biometricAvailable && showBiometricSetup && (
            <div className="mb-6 p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-lg">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2">Set Up {biometricType}</h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-4">We'll guide you through a quick setup. Authenticate with your {biometricType.toLowerCase()} to confirm.</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-base">✅</span>
                  <span>Your biometric data stays on your device - never sent to servers</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-base">✅</span>
                  <span>Use {biometricType.toLowerCase()} to login on your next visit</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <span className="text-base">✅</span>
                  <span>You can disable it anytime from settings</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowBiometricSetup(false)}
                  disabled={biometricLoading}
                  className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 font-medium py-2 rounded-lg transition-colors text-xs sm:text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleBiometricRegister}
                  disabled={biometricLoading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-medium py-2 rounded-lg transition-colors text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  {biometricLoading ? (
                    <>
                      <span>⏳</span>
                      <span>Setting up...</span>
                    </>
                  ) : (
                    <>
                      <span>👆</span>
                      <span>Set Up Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#00d4ff] mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#00d4ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-[#00d4ff] text-xs sm:text-sm bg-[#1a1a2e] text-white placeholder-gray-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-[#00d4ff] mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-[#00d4ff]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-[#00d4ff] text-xs sm:text-sm bg-[#1a1a2e] text-white placeholder-gray-500"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="w-4 h-4 border border-[#00d4ff]/50 rounded focus:ring-2 focus:ring-[#00d4ff] bg-[#1a1a2e]" />
              <label htmlFor="remember" className="ml-2 text-xs sm:text-sm text-gray-400">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00d4ff] hover:bg-[#0099cc] disabled:bg-[#003d66] text-[#1a1a2e] font-semibold py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-[#1a1a2e] border border-[#00d4ff]/30 rounded-lg">
            <p className="text-xs sm:text-sm text-[#00d4ff] font-medium mb-2">Demo Login:</p>
            <p className="text-xs text-gray-300">Any email + password (min 6 chars)</p>
          </div>

          <div className="mt-6 text-center space-y-2">
            <div>
              <a href="#" className="text-[#00d4ff] hover:text-[#00c9a7] text-xs sm:text-sm font-medium">Forgot password?</a>
            </div>
            <div className="text-xs sm:text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="#" className="text-[#00d4ff] hover:text-[#00c9a7] font-medium">Sign up</a>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-white text-xs sm:text-sm font-medium">Secure & Encrypted</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">⏰</div>
            <p className="text-white text-xs sm:text-sm font-medium">24/7 Access</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">📱</div>
            <p className="text-white text-xs sm:text-sm font-medium">Mobile Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
