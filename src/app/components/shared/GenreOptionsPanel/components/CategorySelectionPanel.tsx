import React from 'react';

class CategorySelectionPanel extends React.Component {
  render() {
    return (
      <div className="genre-options-container">
        <div className="main-content no-margin self-contained-padding no-responsive-left-margin">

          <div className="genre-options-container-controls">
            <div className="exit-btn">
              <i className="fa fa-times" />
            </div>
          </div>
          <div className="big-search-box-container">
            <input type="text" className="big-search-box-input" placeholder="Search Categories ..." />
          </div>

          <div className="chips-container padded">
            <div className="chip">
              <div className="chip-content">
                Romance
                <div className="chip-remove-btn">
                  <i className="fa fa-times" />
                </div>
              </div>
            </div>
            <div className="chip">
              <div className="chip-content">
                Horror
                <div className="chip-remove-btn">
                  <i className="fa fa-times" />
                </div>
              </div>
            </div>
            <div className="chip">
              <div className="chip-content">
                Dementia
                <div className="chip-remove-btn">
                  <i className="fa fa-times" />
                </div>
              </div>
            </div>
            <div className="chip">
              <div className="chip-content">
                Action
                <div className="chip-remove-btn">
                  <i className="fa fa-times" />
                </div>
              </div>
            </div>
          </div>

          <div className="anime-small-thumbnail-list">
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <div className="checked">
                  <i className="fa fa-check-circle" />
                  <i className="fa fa-circle" />
                </div>
                <img src="img/categories/Action.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Action</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/Adventure.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Adventure</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/Comedy.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Comedy</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/DailyLife.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Daily Life</span>
                </div>
              </div>
            </div>

            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/Fantasy.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Fantasy</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <div className="checked">
                  <i className="fa fa-check-circle" />
                  <i className="fa fa-circle" />
                </div>
                <img src="img/categories/Romance.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Romance</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/ScienceFiction.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Science Fiction</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/Sports.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Sports</span>
                </div>
              </div>
            </div>

            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/Action.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Action</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/Adventure.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Adventure</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/Comedy.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Comedy</span>
                </div>
              </div>
            </div>
            <div className="anime-small-thumbnail small category">
              <div className="cover">
                <img src="img/categories/DailyLife.png" alt="thumbnail" className="anime-small-thumbnail" />
                <div className="overlay">
                  <span className="category_title">Daily Life</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default CategorySelectionPanel;