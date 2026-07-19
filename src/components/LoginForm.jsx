import React, { useState } from 'react';
import { login } from '../api/client';

export default function LoginForm({ onLoginSuccess, isDark }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login(username, password);
      onLoginSuccess(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-md border rounded-3xl p-8 shadow-2xl transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800 shadow-indigo-950/20' 
        : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Iniciar Sesión
        </h2>
        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Ingresa tus credenciales para acceder
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Usuario
          </label>
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
              isDark 
                ? 'bg-slate-950/90 border-slate-800 text-slate-100 placeholder-slate-500' 
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
            required
          />
        </div>

        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Contraseña
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
              isDark 
                ? 'bg-slate-950/90 border-slate-800 text-slate-100 placeholder-slate-500' 
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
            required
          />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Autenticando...' : 'Ingresar al Panel'}
        </button>
      </form>
    </div>
  );
}
