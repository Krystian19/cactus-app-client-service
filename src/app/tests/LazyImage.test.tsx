import React from 'react';
import { render, shallow } from 'enzyme';

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

test('LazyImage component shell is working properly', () => {
  const component = shallow(componentSetup);
  expect(component).toMatchSnapshot();
});