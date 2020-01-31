import React from 'react';
import { FormattedMessage } from 'react-intl';

import { GQLGenre } from '@cactus-app/types';
import FilterCategoriesChips from '../FilterCategoriesChips';
import CategorySelectionPanel from './components/CategorySelectionPanel';

type PropType = {
  selectedCategories: Array<GQLGenre>;
  categoryRemoved: (category: GQLGenre) => void;
  setSelectedCategories: (categories: GQLGenre[]) => void;
};

type StateType = {
  showCategorySelectionPanel: boolean;
};

class GenreOptionsPanel extends React.Component<PropType, StateType> {
  state = {
    showCategorySelectionPanel: false,
  };

  render() {
    const {
      selectedCategories,
      categoryRemoved,
      setSelectedCategories
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
          <FormattedMessage
            id="cactus.categories"
            defaultMessage="Categories"
          />
        </a>
        <FilterCategoriesChips
          categories={selectedCategories}
          categoryRemoved={(category) => categoryRemoved(category)}
        />

        {showCategorySelectionPanel && (
          <CategorySelectionPanel
            closePanel={() => this.setState({ showCategorySelectionPanel: false })}
            initialSelectedCategories={selectedCategories}
            setSelectedCategories={(categories) => setSelectedCategories(categories)}
          />
        )}
      </div>
    );
  }
}

export default GenreOptionsPanel;
