import React from 'react';

const Filters = ({ filters, setFilters, categories, totalReviews }) => {
  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <input
          type="text"
          placeholder="🔍 Search reviews..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
      </div>
      
      <div className="filter-group">
        <select 
          value={filters.category} 
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      
      <div className="filter-group">
        <select 
          value={filters.rating} 
          onChange={(e) => updateFilter('rating', e.target.value)}
        >
          <option value="">All Ratings</option>
          {[1,2,3,4,5].map(num => (
            <option key={num} value={num}>⭐ {num}+</option>
          ))}
        </select>
      </div>
      
      <div className="stats">
        {totalReviews} total reviews
      </div>
    </div>
  );
};

export default Filters;