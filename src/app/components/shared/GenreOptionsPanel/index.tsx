import React from 'react';
import Genre from '../../@types/Genre';
import FilterCategoriesChips from '../FilterCategoriesChips';

type PropType = {
  categories: Array<Genre>,
  selectedCategories: Array<Genre>,
  categoryRemoved: Function,
  categoryAdded: Function
}

const GenreOptionsPanel = ({
  categories,
  selectedCategories,
  categoryRemoved,
  categoryAdded
}: PropType) => (
    <div className="genre-options-panel">
      <a className="button clear-bg straigth-corners">
        Categories
      </a>
      <FilterCategoriesChips
        categories={selectedCategories}
        categoryRemoved={(id) => categoryRemoved(id)}
      />
    </div>
  );

export default GenreOptionsPanel;
