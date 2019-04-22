import React from 'react';

import Genre from '../../@types/Genre';
import FilterCategoriesChips from '../FilterCategoriesChips';
import CategorySelectionPanel from './components/CategorySelectionPanel';

type PropType = {
  categories: Array<Genre>,
  selectedCategories: Array<Genre>,
  categoryRemoved: Function,
  categoryAdded: Function
}

type StateType = {
  showCategorySelectionPanel: Boolean
}

class GenreOptionsPanel extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      showCategorySelectionPanel: false,
    }
  }

  render() {
    const {
      categories,
      selectedCategories,
      categoryRemoved,
      categoryAdded
    } = this.props;

    return (
      <div className="genre-options-panel">
        <a className="button clear-bg straigth-corners">
          Categories
      </a>
        <FilterCategoriesChips
          categories={selectedCategories}
          categoryRemoved={(id) => categoryRemoved(id)}
        />

        <CategorySelectionPanel />
      </div>
    )
  }
}

export default GenreOptionsPanel;
