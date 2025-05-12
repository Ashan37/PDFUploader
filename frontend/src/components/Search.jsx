import React, { useEffect, useState } from 'react';
import './search.css';

export default function Search() {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPdfs, setFilteredPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/auth/getpdfs', {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setPdfs(data.pdfs);
          setFilteredPdfs(data.pdfs);
        } else {
          alert('Failed to load PDFs');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching PDFs');
      }
    };

    fetchPdfs();
  }, []);

  const handleSearch = () => {
    const result = pdfs.filter(pdf =>
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPdfs(result);
  };

  return (
    <div className="search-container">
      <h1 className="search-heading">Search Research Titles</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      <div className="result-list">
        {filteredPdfs.length > 0 ? (
          filteredPdfs.map((pdf, idx) => (
            <div key={idx} className="result-card">
              <h3>{pdf.title}</h3>
              <p>{pdf.description}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No matching results found.</p>
        )}
      </div>
    </div>
  );
}
