import React, { useState } from 'react';

export default function SearchBar({ value, onChange, onSubmit, loading }) {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex items-center w-full max-w-xl mx-auto mt-8"
    >
      <input
        type="text"
        className="flex-grow rounded-l px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search Afrisearch..."
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-r hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
