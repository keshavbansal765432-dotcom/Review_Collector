import React, { useState, useEffect } from 'react';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import Filters from './components/Filters';
import './App.css';

const App = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [filters, setFilters] = useState({ category: '', rating: '', search: '' });
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) setReviews(JSON.parse(savedReviews));
    setShareLink(window.location.origin + window.location.pathname);
  }, []);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    let filtered = [...reviews];
    if (filters.category) filtered = filtered.filter(r => r.category === filters.category);
    if (filters.rating) filtered = filtered.filter(r => r.rating >= parseInt(filters.rating));
    if (filters.search) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        r.comment.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    setFilteredReviews(filtered);
  }, [reviews, filters]);

  const addReview = (newReview) => {
    const reviewWithId = { ...newReview, id: Date.now(), date: new Date().toISOString() };
    setReviews(prev => [reviewWithId, ...prev]);
  };

  // --- NEW DELETE FUNCTION ---
  const deleteReview = (id) => {
    setReviews(prev => prev.filter(review => review.id !== id));
  };

  const categories = ['General', 'Service', 'Product', 'Support', 'Delivery'];

  return (
    <div className="app">
      <header className="header">
        <h1>📝 Review Collector</h1>
        <p>Share this link: <strong>{shareLink}</strong></p>
        <button
          className="copy-btn"
          onClick={() => {
            if (navigator.clipboard && window.isSecureContext) {
              // Modern browser / Localhost way
              navigator.clipboard.writeText(shareLink);
              alert("Link copied!");
            } else {
              // Fallback way for IP address access (http://10.18.2.133)
              const textArea = document.createElement("textarea");
              textArea.value = shareLink;
              textArea.style.position = "fixed"; // Avoid scrolling to bottom
              document.body.appendChild(textArea);
              textArea.focus();
              textArea.select();
              try {
                document.execCommand('copy');
                alert("Link copied to clipboard (Fallback mode)!");
              } catch (err) {
                alert("Could not copy. Please copy the link manually.");
              }
              document.body.removeChild(textArea);
            }
          }}
        >
          📋 Copy Link
        </button>
      </header>
      <div className="container">
        <div className="form-section">
          <h2>Submit a Review</h2>
          <ReviewForm onSubmit={addReview} categories={categories} />
        </div>
        <div className="reviews-section">
          <h2>All Reviews ({filteredReviews.length})</h2>
          <Filters filters={filters} setFilters={setFilters} categories={categories} totalReviews={reviews.length} />
          {/* Pass the delete function here */}
          <ReviewList reviews={filteredReviews} onDelete={deleteReview} />
        </div>
      </div>
    </div>
  );
};

export default App;