import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews, onDelete }) => {
  if (reviews.length === 0) {
    return (
      <div className="empty-state">
        <h3>No reviews yet</h3>
        <p>Be the first to leave a review!</p>
      </div>
    );
  }

  return (
    <div className="review-list">
      {reviews.map(review => (
        <ReviewCard key={review.id} review={review} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ReviewList;