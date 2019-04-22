import React from 'react';
import Genre from '../../@types/Genre';

type PropType = {
  categories: Array<Genre>
  categoryRemoved: Function,
  alignedCenter?: Boolean,
}

const FilterCategoriesChips = ({ categories, categoryRemoved, alignedCenter = false }: PropType) => (
  <div className={`chips-container ${(!alignedCenter) ? 'aligned-left' : ''}`}>
    {categories.map(genre => (
      <div
        key={String(genre.id)}
        className="chip"
        onClick={() => categoryRemoved(genre.id)}
      >
        <div className="chip-content">
          {genre.title}
          <div
            className="chip-remove-btn"
          >
            <i className="fa fa-times"></i>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default FilterCategoriesChips;
