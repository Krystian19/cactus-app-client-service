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

export default class extends React.Component<PropType, StateType> {
  constructor(props) {
    super(props);

    this.state = {
      showCategorySelectionPanel: false,
    };
  }

  render = (): JSX.Element => {
    const {
      selectedCategories,
      categoryRemoved,
      setSelectedCategories,
    } = this.props;

    const {
      showCategorySelectionPanel,
    } = this.state;

    return (
      <div className="genre-options-panel">
        <a
          className="button clear-bg straigth-corners"
          onClick={(): void => this.setState({ showCategorySelectionPanel: true })}
        >
          <FormattedMessage
            id="cactus.categories"
            defaultMessage="Categories"
          />
        </a>
        <FilterCategoriesChips
          categories={selectedCategories}
          categoryRemoved={(category): void => categoryRemoved(category)}
        />

        {showCategorySelectionPanel && (
          <CategorySelectionPanel
            closePanel={
              (): void => this.setState({ showCategorySelectionPanel: false })
            }
            initialSelectedCategories={selectedCategories}
            setSelectedCategories={
              (categories): void => setSelectedCategories(categories)
            }
          />
        )}
      </div>
    );
  };
}
