import React from 'react';
import renderer from 'react-test-renderer';
import LazyImage from '../src/components/shared_components/LazyImage';

const { test, expect } = window;

test('Tests are working well', () => {
  const component = renderer.create(
    <LazyImage
      src="/img_cdn/test.jpg"
      errorSrc="/img_cdn/test.jpg"
      alt="thumbnail"
      className="anime-small-thumbnail fade-in"
      noLoadingSpinner
    />,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
