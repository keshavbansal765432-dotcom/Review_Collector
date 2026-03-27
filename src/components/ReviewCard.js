import React from 'react';

const ReviewCard = ({ review, onDelete }) => {
  const stars = Array(review.rating).fill('⭐').join('');

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <h4>{review.name}</h4>
          <span className="category-badge">{review.category}</span>
        </div>
        <div className="rating">
          {stars} <span>({review.rating}/5)</span>
        </div>
      </div>
      
      <p className="review-comment">{review.comment}</p>
      
      <div className="review-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="date">
          {new Date(review.date).toLocaleDateString()}
        </span>
        <button className="delete-btn" onClick={() => onDelete(review.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;