import React from 'react';
import { render } from 'enzyme';

import LazyImage from '../components/shared/LazyImage';

const componentSetup = (
  <LazyImage
    src="/img/thumbnail_placeholder.png"
    errorSrc="/img/thumbnail_placeholder.png"
    alt="thumbnail"
    className="anime-small-thumbnail fade-in"
    noLoadingPlaceholder={true}
  />
);

test('LazyImage component is rendering properly', () => {
  const component = render(componentSetup);
  expect(component).toMatchSnapshot();
});
