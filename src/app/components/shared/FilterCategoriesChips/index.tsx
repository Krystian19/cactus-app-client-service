import React from 'react';
import Genre from '../../@types/Genre';

type PropType = {
  categories: Array<Genre>
  categoryRemoved: Function
}

const FilterCategoriesChips = ({ categories, categoryRemoved }: PropType) => (
  <div className="chips-container aligned-left">
    {categories.map(genre => (
      <div
        key={String(genre.id)}
        className="chip"
      >
        <div className="chip-content">
          {genre.title}
          <div
            className="chip-remove-btn"
            onClick={() => categoryRemoved(genre.id)}
          >
            <i className="fa fa-times"></i>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default FilterCategoriesChips;
