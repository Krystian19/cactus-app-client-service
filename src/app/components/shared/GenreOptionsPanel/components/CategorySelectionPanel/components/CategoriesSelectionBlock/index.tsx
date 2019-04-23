import React from 'react';

import LazyImage from '../../../../../LazyImage'
import Genre from '../../../../../../@types/Genre';

type PropType = {
  categories: Array<Genre>,
}

class CategoriesSelectionBlock extends React.Component<PropType> {
  render() {
    const {
      categories,
    } = this.props;

    return (
      <div className="anime-small-thumbnail-list">
        {categories.map(category => (
          <div
            key={Number(category.id)}
            className="anime-small-thumbnail small category"
            onClick={() => console.log(`You want to add the category id: ${category.id}`)}
          >
            <div className="cover">
              <div className="checked">
                <i className="fa fa-check-circle" />
                <i className="fa fa-circle" />
              </div>
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
