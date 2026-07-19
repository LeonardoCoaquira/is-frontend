import React, { useState } from 'react';
import { postQR, postRotate } from '../api/client';

const EXAMPLES = {
  qr: [
    { name: "1. Matriz Identidad 2x2", value: "[\n  [1, 0],\n  [0, 1]\n]" },
    { name: "2. Matriz Clásica 3x3", value: "[\n  [12, -51, 4],\n  [6, 167, -68],\n  [-4, 24, -41]\n]" },
    { name: "3. Rectangular 3x2", value: "[\n  [1, 2],\n  [3, 4],\n  [5, 6]\n]" },
    { name: "4. Rectangular Alta 4x3", value: "[\n  [1, 0, 1],\n  [0, 1, 1],\n  [1, 1, 0],\n  [2, 1, 1]\n]" },
    { name: "5. Simétrica 2x2", value: "[\n  [4, 3],\n  [3, 2]\n]" }
  ],
  rotate: [
    { name: "1. Básica 2x2", value: "[\n  [1, 2],\n  [3, 4]\n]" },
    { name: "2. Consecutiva 3x3", value: "[\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n]" },
    { name: "3. Diagonal 4x4", value: "[\n  [1, 0, 0, 0],\n  [0, 2, 0, 0],\n  [0, 0, 3, 0],\n  [0, 0, 0, 4]\n]" },
    { name: "4. Negativos y Ceros 3x3", value: "[\n  [-1, 0, 5],\n  [2, -3, 0],\n  [0, 4, -2]\n]" },
    { name: "5. Matriz Grande 4x4", value: "[\n  [10, 20, 30, 40],\n  [50, 60, 70, 80],\n  [90, 100, 110, 120],\n  [130, 140, 150, 160]\n]" }
  ]
};

export default function MatrixForm({ token, onResult }) {
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
        throw new Error("Formato de matriz JSON inválido. Debe ser una arreglo bidimensional (ej: [[1, 2], [3, 4]]).");
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
    <div className="card">
      <h2>Operación de Matriz</h2>
      <form onSubmit={handleSubmit} className="form-layout">
        <div>
          <label>Operación Seleccionada</label>
          <select value={operation} onChange={e => handleOperationChange(e.target.value)}>
            <option value="rotate">Rotar 90° (Horario)</option>
            <option value="qr">Factorización QR</option>
          </select>
        </div>

        <div>
          <label>Ejemplos Predefinidos</label>
          <select onChange={handlePresetSelect} defaultValue="0">
            {EXAMPLES[operation].map((ex, idx) => (
              <option key={idx} value={idx}>{ex.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Matriz (Formato JSON)</label>
          <textarea 
            rows="7"
            value={matrixStr}
            onChange={e => setMatrixStr(e.target.value)}
            style={{ fontFamily: 'monospace', width: '100%' }}
          />
        </div>

        {error && <div className="error">{error}</div>}
        
        <button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Calcular'}
        </button>
      </form>
    </div>
  );
}
