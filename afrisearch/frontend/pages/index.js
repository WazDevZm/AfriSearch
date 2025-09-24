import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setResults([]);
    try {
      const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      setError('Could not fetch results.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
        <div className="relative px-4 py-16 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Afri<span className="text-yellow-300">search</span>
            </h1>
            <p className="text-xl text-blue-100 font-light max-w-2xl mx-auto leading-relaxed">
              Discover Africa through intelligent search
            </p>
            <div className="mt-6 w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-400 mx-auto rounded-full"></div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-xl"></div>
      </header>

      {/* Main Content */}
      <main className="relative -mt-8 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <SearchBar
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            loading={loading}
          />
          <SearchResults results={results} loading={loading} error={error} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-slate-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} Afrisearch. Empowering African discovery.
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-xs text-slate-400">
              <span>Made with ❤️ for Africa</span>
              <span>•</span>
              <span>Search Engine MVP</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
