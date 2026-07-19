import React from 'react';

const MatrixDisplay = ({ title, matrix, subtitle, isDark }) => (
  <div className={`border rounded-2xl p-4 space-y-2 ${
    isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-100 border-slate-200'
  }`}>
    <div className={`flex justify-between items-center pb-2 border-b ${
      isDark ? 'border-slate-800/80' : 'border-slate-200'
    }`}>
      <h4 className={`font-semibold text-xs ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{title}</h4>
      {subtitle && <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</span>}
    </div>
    <pre className={`font-mono text-xs overflow-x-auto p-2 leading-relaxed ${
      isDark ? 'text-emerald-400' : 'text-indigo-600 font-semibold'
    }`}>
      {matrix.map((row, i) => (
        <div key={i}>[ {row.map(n => n.toFixed(2).padStart(7, ' ')).join(', ')} ]</div>
      ))}
    </pre>
  </div>
);

const StatsDisplay = ({ title, stats, isDark }) => (
  <div className={`border rounded-2xl p-4 space-y-3 ${
    isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-slate-50 border-slate-200'
  }`}>
    <h4 className={`font-semibold text-[11px] uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
      Estadísticas ({title})
    </h4>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
      <div className={`border p-2 rounded-xl text-center ${
        isDark ? 'bg-slate-950/90 border-slate-800/60' : 'bg-white border-slate-200'
      }`}>
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Máximo</span>
        <span className="font-mono text-xs font-bold text-indigo-500">{stats.max.toFixed(2)}</span>
      </div>

      <div className={`border p-2 rounded-xl text-center ${
        isDark ? 'bg-slate-950/90 border-slate-800/60' : 'bg-white border-slate-200'
      }`}>
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Mínimo</span>
        <span className="font-mono text-xs font-bold text-purple-500">{stats.min.toFixed(2)}</span>
      </div>

      <div className={`border p-2 rounded-xl text-center ${
        isDark ? 'bg-slate-950/90 border-slate-800/60' : 'bg-white border-slate-200'
      }`}>
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Promedio</span>
        <span className="font-mono text-xs font-bold text-sky-500">{stats.avg.toFixed(2)}</span>
      </div>

      <div className={`border p-2 rounded-xl text-center ${
        isDark ? 'bg-slate-950/90 border-slate-800/60' : 'bg-white border-slate-200'
      }`}>
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Suma Total</span>
        <span className="font-mono text-xs font-bold text-emerald-500">{stats.sum.toFixed(2)}</span>
      </div>

      <div className={`border p-2 rounded-xl text-center sm:col-span-2 ${
        isDark ? 'bg-slate-950/90 border-slate-800/60' : 'bg-white border-slate-200'
      }`}>
        <span className="block text-[10px] text-slate-400 uppercase font-medium">Es Diagonal</span>
        <span className={`inline-block mt-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full ${
          stats.isDiagonal 
            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500' 
            : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
        }`}>
          {stats.isDiagonal ? 'Sí (Diag. Principal)' : 'No'}
        </span>
      </div>
    </div>
  </div>
);

export default function ResultView({ result, isDark }) {
  if (!result) return null;

  const { type, data } = result;

  return (
    <div className={`border rounded-3xl p-6 shadow-xl space-y-6 transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900/80 backdrop-blur-xl border-slate-800' 
        : 'bg-white border-slate-200 shadow-slate-200/50'
    }`}>
      <div className={`flex items-center justify-between border-b pb-4 ${
        isDark ? 'border-slate-800/80' : 'border-slate-100'
      }`}>
        <div>
          <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Resultados Calculados
          </h3>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Respuesta combinada de Go Matrix API y Node Stats API
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold rounded-full">
          HTTP 200 OK
        </span>
      </div>

      {type === 'qr' && (
        <div className="space-y-6">
          <div className="space-y-3">
            <MatrixDisplay title="Matriz Q" subtitle="Ortogonal" matrix={data.q} isDark={isDark} />
            <StatsDisplay title="Matriz Q" stats={data.stats.q} isDark={isDark} />
          </div>

          <div className="space-y-3">
            <MatrixDisplay title="Matriz R" subtitle="Triangular Superior" matrix={data.r} isDark={isDark} />
            <StatsDisplay title="Matriz R" stats={data.stats.r} isDark={isDark} />
          </div>
        </div>
      )}

      {type === 'rotate' && (
        <div className="space-y-4">
          <MatrixDisplay title="Matriz Rotada 90°" subtitle="Clockwise" matrix={data.matrix} isDark={isDark} />
          <StatsDisplay title="Matriz Rotada" stats={data.stats.matrix} isDark={isDark} />
        </div>
      )}
    </div>
  );
}
