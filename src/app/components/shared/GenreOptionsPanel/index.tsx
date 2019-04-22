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
          onClick={() => {
            console.log('This is settings the state');
            this.setState({ showCategorySelectionPanel: true })
          }}
        >
          Categories
        </a>
        <FilterCategoriesChips
          categories={selectedCategories}
          categoryRemoved={(id) => categoryRemoved(id)}
        />

        {showCategorySelectionPanel && (
          <CategorySelectionPanel />
        )}
      </div>
    )
  }
}

export default GenreOptionsPanel;
