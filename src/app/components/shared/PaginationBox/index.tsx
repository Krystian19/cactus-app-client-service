import React, { Fragment } from 'react';

type PropType = {
  goForwardCB: () => void;
  goBackwardsCB: () => void;
  pageCount: number;
  itemCount: number;
  currentPage: number;
  setCurrentPageCB: (page: number) => void;
};

export default class PaginationBox extends React.Component<PropType> {
  fetchPageNumbers = (lastPageValue: number, currentPage: number): Array<number> => {
    const pageRange = 2;
    const visibleCurrentPage = currentPage + 1;

    // Generates an array that contains a specified range of integers 1..N
    const range = Array.from({ length: lastPageValue }, (v, k) => k + 1);

    // Resolve the range of values below the currentPage value
    const leftRange = range
      .filter(el => (
        (el < visibleCurrentPage)
        && el >= (visibleCurrentPage - pageRange)
        && el !== 1
      ));

    // Resolve the range of values above the currentPage value (ignoring the last page)
    const rightRange = range
      .filter(el => (
        (el > visibleCurrentPage)
        && el <= (visibleCurrentPage + pageRange)
        && el !== lastPageValue
      ));

    return [...leftRange, visibleCurrentPage, ...rightRange];
  }

  render = (): JSX.Element => {
    const {
      goForwardCB,
      goBackwardsCB,
      pageCount,
      itemCount,
      currentPage,
      setCurrentPageCB,
    } = this.props;

    // if no items are supposed to be shown,
    // do not render the component
    if (itemCount === 0) {
      return null;
    }

    // console.log(`Item count ${itemCount}`);
    // console.log(`Page count ${pageCount}`);
    // console.log(`Rounded result is ${Math.ceil(itemCount / pageCount)}`);
    const pageLength = Math.ceil(Number(itemCount) / Number(pageCount));

    // Show the points if the page count exceeds X amount of pages
    const showPoints = (pageLength > 4);

    return (
      <div className="pagination-box">
        <div
          className="item control"
          onClick={(): void => goBackwardsCB()}
          onKeyPress={(): void => goBackwardsCB()}
          role="menuitem"
          tabIndex={-1}
        >
          <svg viewBox="0 0 24 24">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </div>
        { // If the current page is the first page hide this one
          currentPage !== 0
          && (
            <Fragment>
              <div
                key={0}
                className={
                  `item ${((Number(currentPage) + 1) === 1) ? 'active' : ''}`
                }
                onClick={(): void => setCurrentPageCB(Math.abs((0)))}
                onKeyPress={(): void => setCurrentPageCB(Math.abs((0)))}
                role="menuitem"
                tabIndex={-1}
              >
                {1}
              </div>
              {showPoints && (
                <div className="item">
                  ...
                </div>
              )}
            </Fragment>
          )
        }
        {
          this.fetchPageNumbers(pageLength, currentPage).map(num => (
            <div
              key={num}
              className={`item ${(num === (Number(currentPage) + 1)) ? 'active' : ''}`}
              onClick={(): void => setCurrentPageCB(Math.abs((num - 1)))}
              onKeyPress={(): void => setCurrentPageCB(Math.abs((num - 1)))}
              role="menuitem"
              tabIndex={-1}
            >
              {num}
            </div>
          ))
        }
        { // If the current page is the last page hide this one
          pageLength !== (Number(currentPage) + 1)
          && (
            <Fragment>
              {showPoints && (
                <div className="item">
                  ...
                </div>
              )}
              <div
                key={pageLength}
                className={
                  `item ${(pageLength === (Number(currentPage) + 1)) ? 'active' : ''}`
                }
                onClick={(): void => setCurrentPageCB(Math.abs((pageLength - 1)))}
                onKeyPress={(): void => setCurrentPageCB(Math.abs((pageLength - 1)))}
                role="menuitem"
                tabIndex={-1}
              >
                {pageLength}
              </div>
            </Fragment>
          )
        }
        {/* <div className="item active">1</div>
        <div className="item">2</div>
        <div className="item">3</div> */}
        <div className="item mobile-control">
          {`${Number(currentPage) + 1} / ${pageLength}`}
        </div>
        <div
          className="item control"
          onClick={(): void => goForwardCB()}
          onKeyPress={(): void => goForwardCB()}
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
