import React from 'react';
import { GQLGenre } from '@cactus-app/types';

type PropType = {
  categories: Array<GQLGenre>;
  categoryRemoved: (genre: GQLGenre) => void;
  alignedCenter?: boolean;
  padded?: boolean;
};

const FilterCategoriesChips = ({
  categories,
  categoryRemoved,
  alignedCenter = false,
  padded = false,
}: PropType) => (
    <div
      className={
        `chips-container 
        ${(!alignedCenter) ? 'aligned-left' : ''}
        ${(padded) ? 'padded' : ''}
      `}
    >
      {categories.map(genre => (
        <div
          key={String(genre.id)}
          className="chip"
          onClick={() => categoryRemoved(genre)}
        >
          <div className="chip-content">
            {genre.title}
            <div
              className="chip-remove-btn"
            >
              <i className="fa fa-times" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

export default FilterCategoriesChips;
