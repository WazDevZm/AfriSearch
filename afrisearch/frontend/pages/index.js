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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 py-6 shadow">
        <h1 className="text-center text-3xl font-bold text-white tracking-wide">Afrisearch</h1>
        <p className="text-center text-blue-100 mt-2">The African Search Engine MVP</p>
      </header>
      <main className="px-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          loading={loading}
        />
        <SearchResults results={results} loading={loading} error={error} />
      </main>
      <footer className="text-center mt-16 mb-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Afrisearch. All rights reserved.
      </footer>
    </div>
  );
}
