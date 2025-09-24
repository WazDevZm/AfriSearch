import React from 'react';

export default function SearchResults({ results, loading, error }) {
  if (loading) {
    return <div className="mt-8 text-center text-gray-500">Loading results...</div>;
  }
  if (error) {
    return <div className="mt-8 text-center text-red-500">{error}</div>;
  }
  if (!results || results.length === 0) {
    return <div className="mt-8 text-center text-gray-400">No results found.</div>;
  }
  return (
    <div className="mt-8 max-w-xl mx-auto">
      {results.map((item, idx) => (
        <div
          key={idx}
          className="border border-gray-200 rounded p-4 bg-white mb-4"
        >
          <div className="font-semibold text-lg mb-1 text-gray-800">{item.title || 'Untitled Result'}</div>
          <div className="text-gray-600 text-base mb-1">{item.snippet || ''}</div>
          {item.description && (
            <div className="text-gray-500 text-sm mt-2 leading-relaxed">{item.description}</div>
          )}
        </div>
      ))}
    </div>
  );
}
