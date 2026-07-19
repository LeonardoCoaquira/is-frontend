import React from 'react';

const MatrixDisplay = ({ title, matrix, subtitle }) => (
  <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2">
    <div className="flex justify-between items-center pb-2 border-b border-slate-800/80">
      <h4 className="font-semibold text-sm text-slate-200">{title}</h4>
      {subtitle && <span className="text-[10px] text-slate-400 font-mono">{subtitle}</span>}
    </div>
    <pre className="font-mono text-xs text-emerald-400 overflow-x-auto p-2 leading-relaxed">
      {matrix.map((row, i) => (
        <div key={i}>[ {row.map(n => n.toFixed(2).padStart(7, ' ')).join(', ')} ]</div>
      ))}
    </pre>
  </div>
);

const StatsDisplay = ({ title, stats }) => (
  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 space-y-3">
    <h4 className="font-semibold text-xs text-slate-400 uppercase tracking-wider">Estadísticas ({title})</h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <div className="bg-slate-950/90 border border-slate-800/60 p-2.5 rounded-xl text-center">
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Máximo</span>
        <span className="font-mono text-sm font-bold text-indigo-400">{stats.max.toFixed(2)}</span>
      </div>

      <div className="bg-slate-950/90 border border-slate-800/60 p-2.5 rounded-xl text-center">
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Mínimo</span>
        <span className="font-mono text-sm font-bold text-purple-400">{stats.min.toFixed(2)}</span>
      </div>

      <div className="bg-slate-950/90 border border-slate-800/60 p-2.5 rounded-xl text-center">
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Promedio</span>
        <span className="font-mono text-sm font-bold text-sky-400">{stats.avg.toFixed(2)}</span>
      </div>

      <div className="bg-slate-950/90 border border-slate-800/60 p-2.5 rounded-xl text-center">
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Suma Total</span>
        <span className="font-mono text-sm font-bold text-emerald-400">{stats.sum.toFixed(2)}</span>
      </div>

      <div className="bg-slate-950/90 border border-slate-800/60 p-2.5 rounded-xl text-center sm:col-span-2">
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Es Diagonal</span>
        <span className={`inline-block mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
          stats.isDiagonal 
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' 
            : 'bg-slate-800 text-slate-400'
        }`}>
          {stats.isDiagonal ? 'Sí (Diagonal Principal)' : 'No (Elementos fuera de diag.)'}
        </span>
      </div>
    </div>
  </div>
);

export default function ResultView({ result }) {
  if (!result) return null;

  const { type, data } = result;

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Resultados Calculados</h3>
          <p className="text-xs text-slate-400">Respuesta combinada de Go Matrix API y Node Stats API</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
          HTTP 200 OK
        </span>
      </div>

      {type === 'qr' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <MatrixDisplay title="Matriz Q" subtitle="Ortogonal" matrix={data.q} />
            <StatsDisplay title="Matriz Q" stats={data.stats.q} />
          </div>

          <div className="space-y-4">
            <MatrixDisplay title="Matriz R" subtitle="Triangular Superior" matrix={data.r} />
            <StatsDisplay title="Matriz R" stats={data.stats.r} />
          </div>
        </div>
      )}

      {type === 'rotate' && (
        <div className="max-w-2xl mx-auto space-y-4">
          <MatrixDisplay title="Matriz Rotada 90°" subtitle="Clockwise" matrix={data.matrix} />
          <StatsDisplay title="Matriz Rotada" stats={data.stats.matrix} />
        </div>
      )}
    </div>
  );
}
