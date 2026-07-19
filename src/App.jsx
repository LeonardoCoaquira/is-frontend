import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import MatrixForm from './components/MatrixForm';
import ResultView from './components/ResultView';

function App() {
  const [token, setToken] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white text-lg">M</span>
            </div>
            <div>
              <h1 className="font-bold text-lg text-white tracking-tight leading-none">Interseguro</h1>
              <span className="text-xs text-slate-400 font-medium">Coding Challenge · Matrix & Stats API</span>
            </div>
          </div>

          {token && (
            <button 
              onClick={() => { setToken(null); setResult(null); }}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all border border-slate-700/50 shadow-sm"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        {!token ? (
          <div className="py-12 flex justify-center">
            <LoginForm onLoginSuccess={setToken} />
          </div>
        ) : (
          <div className="space-y-8">
            <MatrixForm token={token} onResult={setResult} />
            {result && <ResultView result={result} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        <p>Interseguro Technical Assessment · Powered by Go Fiber & Node.js Express</p>
      </footer>
    </div>
  );
}

export default App;
