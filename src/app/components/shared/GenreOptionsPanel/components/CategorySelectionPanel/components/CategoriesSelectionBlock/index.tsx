import React from 'react';

import LazyImage from '../../../../../LazyImage'
import RandomTextEmoji from '../../../../../RandomTextEmoji';
import Genre from '../../../../../../@types/Genre';

type PropType = {
  categories: Array<Genre>,
  selectedCategories: Array<Genre>,
  categorySelected: Function,
}

class CategoriesSelectionBlock extends React.Component<PropType> {

  thisCategoryIsSelected = (
    category: Genre,
    selectedCategories: Array<Genre>
  ): Boolean => {

    // Check if the provided category has been selected in the provided array
    const categoryIsSelected =
      selectedCategories.filter(
        cat => cat.id == category.id
      );

    if (categoryIsSelected.length > 0) {
      return true;
    }

    return false;
  }

  render() {
    const {
      categories,
      selectedCategories,
      categorySelected
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
        {categories.map(category => (
          <div
            key={Number(category.id)}
            className="anime-small-thumbnail small category"
            onClick={() => {
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
                errorSrc="/img/category_placeholder.png"
                alt="thumbnail"
                className="anime-small-thumbnail fade-in"
                noLoadingSpinner
              />
              <div className="overlay">
                <span className="category_title">{category.title}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CategoriesSelectionBlock;

// const CategoriesBlock = (props: PropType) => {
//   const {
//     categories,
//     title,
//     viewAllLink,
//     history
//   } = props;

// return (
//   <div className="video-block">
//     <div className="video-block-title">
//       <div className="video-block-title-head">
//         <span>{title}</span>
//       </div>
//       {viewAllLink && (
//         <Link to={String(viewAllLink)} className="button">
//           View all
//           </Link>
//       )}
//     </div>
//     <div className="video-block-content">
//       <div className="anime-small-thumbnail-list">

        // {categories.map(category => (
        //   <div
        //     key={Number(category.id)}
        //     className="anime-small-thumbnail small category"
        //     onClick={() => history.push('/search')}
        //   >
        //     <div className="cover">
        //       <div className="checked">
        //         <i className="fa fa-check-circle" />
        //         <i className="fa fa-circle" />
        //       </div>
        //       <LazyImage
        //         src={`/img_cdn/${category.thumbnail}`}
        //         errorSrc="/img/category_placeholder.png"
        //         alt="thumbnail"
        //         className="anime-small-thumbnail fade-in"
        //         noLoadingSpinner
        //       />
        //       <div className="overlay">
        //         <span className="category_title">{category.title}</span>
        //       </div>
        //     </div>
        //   </div>
        // ))}

//       </div>
//     </div>
//   </div>
// );
// }

// export default withRouter(CategoriesBlock);
