import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from 'react-router-dom';

import Genre from '../../@types/Genre';

type PropType = RouteComponentProps<{}> & {
  categories: Array<Genre>
}

const CategoriesChips = ({ categories }: PropType) => (
  <div className="chips-container aligned-left">
    {categories.map(genre => (
      <Link
        to='/search'
        key={String(genre.id)}
      >
        <div
          className="chip"
        >
          <div className="chip-content">
            {genre.title}
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default withRouter(CategoriesChips);
