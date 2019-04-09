import React from 'react';
import { RouteComponentProps } from "react-router";
import {
  Link,
  withRouter,
} from 'react-router-dom';

import Genre from '../../@types/Genre';

type PropType = RouteComponentProps<{}> & {
  categories: Array<Genre>
}

class CategoriesChips extends React.Component<PropType> {
  render() {
    const { history, categories } = this.props;

    return (
      <div className="chips-container aligned-left">
        {categories.map(genre => (
          <div
            key={String(genre.id)}
            className="chip"
            onClick={
              () => history.push('/search')
            }
          >
            <div className="chip-content">
              {genre.title}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(CategoriesChips);
