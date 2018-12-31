import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import VideoBlock from '../src/components/shared_components/VideoBlock';

const { test, expect } = window;

const episodes = [
  {
    'id': 21,
    'thumbnail': 'test.jpg',
    'episodeOrder': 12,
    'Season': {
      'id': 7,
      'seasonOrder': 1,
      'title': 'Goblin Slayer',
      'background': 'test.jpg',
      'Anime': {
        'id': 9,
        'title': 'Goblin Slayer',
        '__typename': 'Anime',
      },
      '__typename': 'Season',
    },
    '__typename': 'Episode',
  },
];

test('Tests are working well', () => {
  const component = renderer.create(
    <MemoryRouter>
      <VideoBlock
        props={{
          title: 'Newest episodes',
          episodes,
          viewAllLink: '/newest_episodes',
        }}
      />
    </MemoryRouter>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
