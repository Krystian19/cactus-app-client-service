import React, { Component } from 'react';

class PaginationBox extends Component {
  // constructor(props) {
  //   super(props);
  // }

  fetchPageNumbers = (lastPageValue, currentPage) => {
    const pageRange = 2;
    const visibleCurrentPage = currentPage + 1;
    // Generates an array that contains a specified range of integers
    const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

    // Resolve the range of values below the currentPage value
    const leftRange = range(1, lastPageValue)
      .filter(el => (
        (el < visibleCurrentPage) && el >= (visibleCurrentPage - pageRange)
      ));

    // Resolve the range of values above the currentPage value (ignoring the last page)
    const rightRange = range(1, lastPageValue)
      .filter(el => (
        (el > visibleCurrentPage)
        && el <= (visibleCurrentPage + pageRange)
        && el !== lastPageValue
      ));

    return [...leftRange, visibleCurrentPage, ...rightRange];

    // return range(1, lastPageValue);
  }

  render() {
    const {
      goForwardCB,
      goBackwardsCB,
      pageCount,
      itemCount,
      currentPage,
      setCurrentPageCB,
    } = this.props;

    // console.log(`Item count ${itemCount}`);
    // console.log(`Page count ${pageCount}`);
    // console.log(`Rounded result is ${Math.ceil(itemCount / pageCount)}`);
    const lastPageValue = Math.ceil(itemCount / pageCount);
    return (
      <div className="pagination-box">
        <div
          className="item control"
          onClick={goBackwardsCB}
          onKeyPress={goBackwardsCB}
          role="menuitem"
          tabIndex={-1}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </div>
        {
          this.fetchPageNumbers(lastPageValue, currentPage).map(num => (
            <div
              key={num}
              className={`item ${(num === (currentPage + 1)) ? 'active' : ''}`}
              onClick={() => setCurrentPageCB(Math.abs((num - 1)))}
              onKeyPress={() => setCurrentPageCB(Math.abs((num - 1)))}
              role="menuitem"
              tabIndex={-1}
            >
              {num}
            </div>
          ))
        }
        { // If the current page is the last page hide this one
          lastPageValue !== (currentPage + 1)
          && (
            <div
              key={lastPageValue}
              className={
                `item ${(lastPageValue === (currentPage + 1)) ? 'active' : ''}`
              }
              onClick={() => setCurrentPageCB(Math.abs((lastPageValue - 1)))}
              onKeyPress={() => setCurrentPageCB(Math.abs((lastPageValue - 1)))}
              role="menuitem"
              tabIndex={-1}
            >
              {lastPageValue}
            </div>
          )
        }
        {/* <div className="item active">1</div>
        <div className="item">2</div>
        <div className="item">3</div> */}
        <div className="item mobile-control">
          {`${currentPage + 1} / ${lastPageValue}`}
        </div>
        <div
          className="item control"
          onClick={goForwardCB}
          onKeyPress={goForwardCB}
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
