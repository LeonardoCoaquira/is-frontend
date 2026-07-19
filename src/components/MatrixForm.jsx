import React, { useState } from 'react';
import { postQR, postRotate } from '../api/client';

const EXAMPLES = {
  rotate: [
    { name: "1. Básica 2x2", value: "[\n  [1, 2],\n  [3, 4]\n]" },
    { name: "2. Consecutiva 3x3", value: "[\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n]" },
    { name: "3. Diagonal 4x4", value: "[\n  [1, 0, 0, 0],\n  [0, 2, 0, 0],\n  [0, 0, 3, 0],\n  [0, 0, 0, 4]\n]" },
    { name: "4. Negativos y Ceros 3x3", value: "[\n  [-1, 0, 5],\n  [2, -3, 0],\n  [0, 4, -2]\n]" },
    { name: "5. Matriz Grande 4x4", value: "[\n  [10, 20, 30, 40],\n  [50, 60, 70, 80],\n  [90, 100, 110, 120],\n  [130, 140, 150, 160]\n]" }
  ],
  qr: [
    { name: "1. Matriz Identidad 2x2", value: "[\n  [1, 0],\n  [0, 1]\n]" },
    { name: "2. Matriz Clásica 3x3", value: "[\n  [12, -51, 4],\n  [6, 167, -68],\n  [-4, 24, -41]\n]" },
    { name: "3. Rectangular 3x2", value: "[\n  [1, 2],\n  [3, 4],\n  [5, 6]\n]" },
    { name: "4. Rectangular Alta 4x3", value: "[\n  [1, 0, 1],\n  [0, 1, 1],\n  [1, 1, 0],\n  [2, 1, 1]\n]" },
    { name: "5. Simétrica 2x2", value: "[\n  [4, 3],\n  [3, 2]\n]" }
  ]
};

export default function MatrixForm({ token, onResult, isDark }) {
  const [operation, setOperation] = useState('rotate');
  const [matrixStr, setMatrixStr] = useState(EXAMPLES.rotate[0].value);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOperationChange = (newOp) => {
    setOperation(newOp);
    setMatrixStr(EXAMPLES[newOp][0].value);
  };

  const handlePresetSelect = (e) => {
    const idx = parseInt(e.target.value, 10);
    if (!isNaN(idx) && EXAMPLES[operation][idx]) {
      setMatrixStr(EXAMPLES[operation][idx].value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let matrix;
      try {
        matrix = JSON.parse(matrixStr);
        if (!Array.isArray(matrix) || matrix.length === 0 || !Array.isArray(matrix[0])) {
          throw new Error();
        }
      } catch {
        throw new Error("Formato de matriz JSON inválido. Debe ser un arreglo bidimensional (ej: [[1, 2], [3, 4]]).");
      }

      let data;
      if (operation === 'qr') {
        data = await postQR(matrix, token);
      } else {
        data = await postRotate(matrix, token);
      }
      
      onResult({ type: operation, data, inputMatrix: matrix });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`border rounded-3xl p-6 shadow-xl transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800' 
        : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className={`flex items-center justify-between mb-6 pb-4 border-b ${
        isDark ? 'border-slate-800/80' : 'border-slate-100'
      }`}>
        <div>
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Configuración de Operación
          </h2>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Ingresa la matriz y selecciona la acción
          </p>
        </div>
        <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-semibold rounded-full uppercase tracking-wider">
          {operation === 'rotate' ? 'Rotación 90°' : 'QR Factor'}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Operación Requerida
          </label>
          <select 
            value={operation} 
            onChange={e => handleOperationChange(e.target.value)}
            className={`w-full px-4 py-2.5 border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
              isDark 
                ? 'bg-slate-950/90 border-slate-800 text-slate-100' 
                : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <option value="rotate">Rotar 90° Horario (Go + Node)</option>
            <option value="qr">Factorización QR (Go + Node)</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Cargar Ejemplo Rápido
          </label>
          <select 
            onChange={handlePresetSelect} 
            defaultValue="0"
            className={`w-full px-4 py-2.5 border rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
              isDark 
                ? 'bg-slate-950/90 border-slate-800 text-slate-100' 
                : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            {EXAMPLES[operation].map((ex, idx) => (
              <option key={idx} value={idx}>{ex.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Matriz de Entrada (JSON)
          </label>
          <textarea 
            rows="6"
            value={matrixStr}
            onChange={e => setMatrixStr(e.target.value)}
            className={`w-full p-4 border rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all leading-relaxed ${
              isDark 
                ? 'bg-slate-950 border-slate-800 text-emerald-400' 
                : 'bg-slate-100 border-slate-200 text-slate-800 focus:bg-white'
            }`}
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
          className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <span>Procesando...</span>
          ) : (
            <span>Calcular y Obtener Stats</span>
          )}
        </button>
      </form>
    </div>
  );
}
