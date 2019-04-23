import React from 'react';

import Genre from '../../@types/Genre';
import FilterCategoriesChips from '../FilterCategoriesChips';
import CategorySelectionPanel from './components/CategorySelectionPanel';

type PropType = {
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
      selectedCategories,
      categoryRemoved,
      categoryAdded
    } = this.props;

    const {
      showCategorySelectionPanel
    } = this.state;

    return (
      <div className="genre-options-panel">
        <a
          className="button clear-bg straigth-corners"
          onClick={() =>
            this.setState({ showCategorySelectionPanel: true })}
        >
          Categories
        </a>
        <FilterCategoriesChips
          categories={selectedCategories}
          categoryRemoved={(category) => categoryRemoved(category)}
        />

        {showCategorySelectionPanel && (
          <CategorySelectionPanel
            closePanel={() =>
              this.setState({ showCategorySelectionPanel: false })}
            selectedCategories={selectedCategories}
            categoryRemoved={(category) => categoryRemoved(category)}
            categorySelected={(category) => categoryAdded(category)}
          />
        )}
      </div>
    )
  }
}

export default GenreOptionsPanel;
