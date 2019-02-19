import React from 'react';
import { render } from 'enzyme';

import LazyImage from '../components/shared/LazyImage';

const componentSetup = (
  <LazyImage
    src="/img_cdn/test.jpg"
    errorSrc="/img_cdn/test.jpg"
    alt="thumbnail"
    className="anime-small-thumbnail fade-in"
    noLoadingSpinner
  />
);

test('LazyImage component is rendering properly', () => {
  const component = render(componentSetup);
  expect(component).toMatchSnapshot();
});
