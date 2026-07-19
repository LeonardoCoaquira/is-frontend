import React from 'react';

const MatrixDisplay = ({ title, matrix }) => (
  <div className="matrix-display">
    <h4>{title}</h4>
    <pre>
      {matrix.map((row, i) => (
        <div key={i}>[ {row.map(n => n.toFixed(2)).join(', ')} ]</div>
      ))}
    </pre>
  </div>
);

const StatsDisplay = ({ title, stats }) => (
  <div className="stats-display">
    <h4>Estadísticas ({title})</h4>
    <ul>
      <li><strong>Máximo:</strong> {stats.max.toFixed(2)}</li>
      <li><strong>Mínimo:</strong> {stats.min.toFixed(2)}</li>
      <li><strong>Promedio:</strong> {stats.avg.toFixed(2)}</li>
      <li><strong>Suma:</strong> {stats.sum.toFixed(2)}</li>
      <li><strong>Es Diagonal:</strong> {stats.isDiagonal ? 'Sí' : 'No'}</li>
    </ul>
  </div>
);

export default function ResultView({ result }) {
  if (!result) return null;

  const { type, data } = result;

  return (
    <div className="card results">
      <h2>Resultados</h2>
      
      {type === 'qr' && (
        <div className="result-grid">
          <div>
            <MatrixDisplay title="Matriz Q (Ortogonal)" matrix={data.q} />
            <StatsDisplay title="Matriz Q" stats={data.stats.q} />
          </div>
          <div>
            <MatrixDisplay title="Matriz R (Triangular Superior)" matrix={data.r} />
            <StatsDisplay title="Matriz R" stats={data.stats.r} />
          </div>
        </div>
      )}

      {type === 'rotate' && (
        <div className="result-grid">
          <div>
            <MatrixDisplay title="Matriz Rotada 90°" matrix={data.matrix} />
            <StatsDisplay title="Matriz Rotada" stats={data.stats.matrix} />
          </div>
        </div>
      )}
    </div>
  );
}
