import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import MatrixForm from './components/MatrixForm';
import ResultView from './components/ResultView';

function App() {
  const [token, setToken] = useState(null);
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <header>
        <h1>Reto Técnico Interseguro - Matrices</h1>
        {token && <button className="logout-btn" onClick={() => { setToken(null); setResult(null); }}>Cerrar Sesión</button>}
      </header>
      
      <main>
        {!token ? (
          <LoginForm onLoginSuccess={setToken} />
        ) : (
          <div className="dashboard">
            <MatrixForm token={token} onResult={setResult} />
            {result && <ResultView result={result} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
