import React from 'react';

export default function SearchResults({ results, loading, error }) {
  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-2xl mx-auto space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
              <div className="animate-pulse">
                <div className="h-4 bg-slate-200 rounded-lg w-3/4 mb-3"></div>
                <div className="h-3 bg-slate-200 rounded-lg w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded-lg w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-3 text-slate-500">
            <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>
            <span className="font-medium">Searching across Africa...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-red-800 font-semibold mb-2">Search Error</h3>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="animate-fade-in max-w-2xl mx-auto">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No results found</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            We couldn't find any results matching your search. Try different keywords or check your spelling.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <div className="mb-6">
        <p className="text-slate-600 font-medium">
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="space-y-4">
        {results.map((item, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-200 cursor-pointer"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="space-y-3">
              {/* Title */}
              <h3 className="font-semibold text-lg text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {item.title || 'Untitled Result'}
              </h3>
              
              {/* Snippet */}
              {item.snippet && (
                <p className="text-slate-600 leading-relaxed line-clamp-3">
                  {item.snippet}
                </p>
              )}
              
              {/* Description */}
              {item.description && (
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              )}
              
              {/* Action indicator */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Available</span>
                </div>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
