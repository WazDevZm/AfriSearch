export default function handler(req, res) {
  const { q } = req.query;
  // Mock results
  const results = q
    ? [
        { title: `Result for "${q}"`, snippet: 'This is a sample search result snippet.' },
        { title: `Another result for "${q}"`, snippet: 'Another example snippet for the search engine.' },
      ]
    : [];
  res.status(200).json({ results });
}
