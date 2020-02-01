import React from 'react';
import { GQLGenre } from '@cactus-app/types';

import LazyImage from '../../../../../LazyImage';
import RandomTextEmoji from '../../../../../RandomTextEmoji';
import base64Content from '../../../../../../../utils/base64Content';

type PropType = {
  categories: Array<GQLGenre>;
  selectedCategories: Array<GQLGenre>;
  categorySelected: (category: GQLGenre) => void;
};

export default class extends React.Component<PropType> {
  thisCategoryIsSelected = (
    category: GQLGenre,
    selectedCategories: Array<GQLGenre>,
  ): boolean => selectedCategories.filter((cat) => cat.id === category.id).length > 0;

  render = (): JSX.Element => {
    const {
      categories,
      selectedCategories,
      categorySelected,
    } = this.props;

    // If no categories were received
    if (categories.length === 0) {
      return (
        <div className="anime-thumbnail-list no-grid">
          <div className="nothing-found">
            <h1 className="text-emoji">
              {RandomTextEmoji()}
            </h1>
            <h2 className="nothing-found-title">
              Nothing found
            </h2>
          </div>
        </div>
      );
    }

    return (
      <div className="anime-small-thumbnail-list">
        {categories.map((category) => (
          <div
            key={Number(category.id)}
            className="anime-small-thumbnail small category"
            onClick={(): void => {
              // Prevents selecting a category twice
              if (!this.thisCategoryIsSelected(category, selectedCategories)) {
                categorySelected(category);
              }
            }}
          >
            <div className="cover">
              {
                this.thisCategoryIsSelected(category, selectedCategories) && (
                  <div className="checked">
                    <i className="fa fa-check-circle" />
                    <i className="fa fa-circle" />
                  </div>
                )
              }
              <LazyImage
                src={`/img_cdn/${category.thumbnail}`}
                errorSrc={base64Content.cactus_category_placeholder}
                alt="thumbnail"
                className="anime-small-thumbnail fade-in"
                customLoadingPlaceholderSrc={
                  base64Content.cactus_category_placeholder
                }
              />
              <div className="overlay">
                <span className="category_title">{category.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
}
