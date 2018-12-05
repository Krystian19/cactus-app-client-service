import React from 'react';
import LazyImage from '../LazyImage';

// ({ Categories }) => (
const CategoriesBlock = (props) => {
  const { props: { categories, title, viewAllLink } } = props;

  return (
    <div className="video-block">
      <div className="video-block-title">
        <div className="video-block-title-head">
          <span>{title}</span>
        </div>
        {viewAllLink && (
          <div className="video-block-title-options">
            <a href={viewAllLink} className="button">View all</a>
          </div>
        )}
      </div>
      <div className="video-block-content">
        <div className="anime-small-thumbnail-list">

          {categories.map(category => (
            <div
              key={category.id}
              className="anime-small-thumbnail small category"
            >
              <div className="cover">
                {/* <img
                  src={`/img_cdn/${category.thumbnail}`}
                  alt="thumbnail"
                  className="anime-small-thumbnail"
                /> */}
                <LazyImage
                  src={`/img_cdn/${category.thumbnail}`}
                  errorSrc="/img_cdn/test.jpg"
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
      </div>
    </div>
  );
};

export default CategoriesBlock;

// {/* Start of row */}
// <div className="anime-small-thumbnail small category">
//   <div className="cover">
//     <img src="img/categories/Action.png"
//       alt="thumbnail" className="anime-small-thumbnail" />
//     <div className="overlay">
//       <span className="category_title">Action</span>
//     </div>
//   </div>
// </div>
//   <div className="anime-small-thumbnail small category">
//     <div className="cover">
//       <img src="img/categories/Adventure.png"
//         alt="thumbnail" className="anime-small-thumbnail" />
//       <div className="overlay">
//         <span className="category_title">Adventure</span>
//       </div>
//     </div>
//   </div>
//   <div className="anime-small-thumbnail small category">
//     <div className="cover">
//       <img src="img/categories/Comedy.png" alt="thumbnail" className="anime-small-thumbnail" />
//       <div className="overlay">
//         <span className="category_title">Comedy</span>
//       </div>
//     </div>
//   </div>
//   <div className="anime-small-thumbnail small category">
//     <div className="cover">
//       <img src="img/categories/DailyLife.png"
//         alt="thumbnail" className="anime-small-thumbnail" />
//       <div className="overlay">
//         <span className="category_title">Daily Life</span>
//       </div>
//     </div>
//   </div>
// {/* End of row */ }

// {/* Start of row */ }
// <div className="anime-small-thumbnail small category">
//   <div className="cover">
//     <img src="img/categories/Fantasy.png"
//       alt="thumbnail" className="anime-small-thumbnail" />
//     <div className="overlay">
//       <span className="category_title">Fantasy</span>
//     </div>
//   </div>
// </div>
//   <div className="anime-small-thumbnail small category">
//     <div className="cover">
//       <img src="img/categories/Romance.png"
//         alt="thumbnail" className="anime-small-thumbnail" />
//       <div className="overlay">
//         <span className="category_title">Romance</span>
//       </div>
//     </div>
//   </div>
//   <div className="anime-small-thumbnail small category">
//     <div className="cover">
//       <img src="img/categories/ScienceFiction.png"
//         alt="thumbnail" className="anime-small-thumbnail" />
//       <div className="overlay">
//         <span className="category_title">Science Fiction</span>
//       </div>
//     </div>
//   </div>
//   <div className="anime-small-thumbnail small category">
//     <div className="cover">
//       <img src="img/categories/Sports.png"
//         alt="thumbnail" className="anime-small-thumbnail" />
//       <div className="overlay">
//         <span className="category_title">Sports</span>
//       </div>
//     </div>
//   </div>
// {/* End of row */ }