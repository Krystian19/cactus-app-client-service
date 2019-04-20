import React from 'react';

class GenreOptionsPanel extends React.Component {
  render() {
    return (
      <div className="genre-options-panel">
        <a className="button clear-bg straigth-corners">
          Categories
        </a>
        <div className="chips-container aligned-left">
          <div className="chip">
            <div className="chip-content">
              Romance
              <div className="chip-remove-btn">
                <i className="fa fa-times"></i>
              </div>
            </div>
          </div>
          <div className="chip">
            <div className="chip-content">
              Horror
              <div className="chip-remove-btn">
                <i className="fa fa-times"></i>
              </div>
            </div>
          </div>
          <div className="chip">
            <div className="chip-content">
              Dementia
              <div className="chip-remove-btn">
                <i className="fa fa-times"></i>
              </div>
            </div>
          </div>
          <div className="chip">
            <div className="chip-content">
              Action
              <div className="chip-remove-btn">
                <i className="fa fa-times"></i>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default GenreOptionsPanel;
