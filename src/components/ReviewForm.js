import React, { useState } from 'react';

const ReviewForm = ({ onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0],
    rating: 5,
    comment: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.comment.trim()) {
      onSubmit(formData);
      setFormData({ name: '', category: categories[0], rating: 5, comment: '' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <div className="form-group">
        <label>Your Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Rating</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>⭐ {num}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Your Review *</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Share your experience..."
          rows="4"
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;