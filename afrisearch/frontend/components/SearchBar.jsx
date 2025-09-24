import React, { useState } from 'react';

export default function SearchBar({ value, onChange, onSubmit, loading }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="animate-fade-in">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
        className="relative max-w-2xl mx-auto mb-8"
      >
        <div className={`
          relative bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden
          ${isFocused ? 'shadow-2xl shadow-blue-500/20 scale-[1.02]' : 'shadow-lg'}
          ${loading ? 'animate-pulse-custom' : ''}
        `}>
          {/* Animated border - moved to background */}
          <div className={`
            absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 z-0
            ${isFocused ? 'opacity-100' : 'opacity-0'}
          `}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-[2px]">
              <div className="w-full h-full bg-white rounded-2xl"></div>
            </div>
          </div>

          {/* Search Input - moved to foreground */}
          <div className="relative flex items-center z-10">
            <div className="absolute left-6 text-slate-400 z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="w-full pl-14 pr-32 py-4 text-lg bg-transparent border-none focus:outline-none placeholder-slate-400 text-slate-700 relative z-10"
              placeholder="Search across Africa..."
              value={value}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !value.trim()}
              className={`
                absolute right-2 px-6 py-2.5 rounded-xl font-medium transition-all duration-200 z-10
                ${loading || !value.trim() 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-95'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                  <span>Searching</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Search</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Search suggestions hint */}
        {!loading && value.length === 0 && (
          <div className="mt-4 text-center">
            <p className="text-slate-500 text-sm">
              Try searching for businesses, news, or locations across Africa
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
