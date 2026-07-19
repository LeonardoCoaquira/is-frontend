import React, { useState } from 'react';
import { login } from '../api/client';

export default function LoginForm({ onLoginSuccess }) {
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
    <div className="card">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="form-layout">
        <div>
          <label>Usuario</label>
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}
