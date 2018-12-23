import React, { Component } from 'react';

class PaginationBox extends Component {
  render() {
    return (
      <div className="pagination-box">
        <div className="item control">
          <svg viewBox="0 0 24 24">
            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
          </svg>
        </div>
        <div className="item active">1</div>
        <div className="item">2</div>
        <div className="item">3</div>
        <div className="item mobile-control">1 / 42</div>
        <div className="item control">
          <svg viewBox="0 0 24 24">
            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
          </svg>
        </div>
      </div>
    );
  }
}

export default PaginationBox;
