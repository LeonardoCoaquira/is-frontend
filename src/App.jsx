import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import MatrixForm from './components/MatrixForm';
import ResultView from './components/ResultView';

function App() {
  const [token, setToken] = useState(null);
  const [result, setResult] = useState(null);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    } selection:bg-indigo-500 selection:text-white`}>
      {/* Header */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300 ${
        isDark ? 'border-slate-800/80 bg-slate-900/50' : 'border-slate-200 bg-white/70'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-xl">M</span>
            </div>
            <div>
              <h1 className={`font-bold text-lg tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Interseguro
              </h1>
              <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Coding Challenge · Matrix & Stats API
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Dark/Light Mode Toggle Button */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition-all ${
                isDark 
                  ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700/60' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
              }`}
              title="Cambiar Modo"
            >
              <span>{isDark ? '🌙 Oscuro' : '☀️ Claro'}</span>
            </button>

            {token && (
              <button 
                onClick={() => { setToken(null); setResult(null); }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  isDark 
                    ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20' 
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200'
                }`}
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {!token ? (
          <div className="py-12 flex justify-center">
            <LoginForm onLoginSuccess={setToken} isDark={isDark} />
          </div>
        ) : (
          /* Side-by-Side Layout: Form on Left (5 cols), Result on Right (7 cols) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 sticky top-24">
              <MatrixForm token={token} onResult={setResult} isDark={isDark} />
            </div>
            
            <div className="lg:col-span-7">
              {result ? (
                <ResultView result={result} isDark={isDark} />
              ) : (
                <div className={`border rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 ${
                  isDark ? 'bg-slate-900/40 border-slate-800/60 text-slate-500' : 'bg-white/60 border-slate-200 text-slate-400 shadow-sm'
                }`}>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xl mb-1">
                    📊
                  </div>
                  <h3 className={`font-semibold text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Esperando Operación
                  </h3>
                  <p className="text-xs max-w-xs">
                    Selecciona una matriz en el panel izquierdo y haz clic en calcular para ver los resultados y estadísticas a la derecha.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-6 text-center text-xs transition-colors duration-300 ${
        isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-200 text-slate-400'
      }`}>
        <p>Interseguro Technical Assessment · Powered by Go Fiber & Node.js Express</p>
      </footer>
    </div>
  );
}

export default App;
