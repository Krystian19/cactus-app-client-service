import React, { Component } from 'react';

class PaginationBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
    };
  }

  render() {
    const {
      goForwardCB,
      goBackwardsCB,
      pageCount,
      itemCount,
    } = this.props;

    const { currentPage } = this.state;

    console.log(`Item count ${itemCount}`);
    console.log(`Page count ${pageCount}`);
    console.log(`Rounded result is ${Math.ceil(itemCount / pageCount)}`);
    return (
      <div className="pagination-box">
        <div
          className="item control"
          onClick={goForwardCB}
          onKeyPress={goForwardCB}
          role="menuitem"
          tabIndex={-1}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </div>
        <div className="item active">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item mobile-control">
          {`${currentPage} / ${Math.ceil(itemCount / pageCount)}`}
        </div>
        <div
          className="item control"
          onClick={goBackwardsCB}
          onKeyPress={goBackwardsCB}
          role="menuitem"
          tabIndex={-2}
        >
          <svg viewBox="0 0 24 24">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </div>
      </div>
    );
  }
}

export default PaginationBox;
