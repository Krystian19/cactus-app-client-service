import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import VideoBlock from '../components/shared/VideoBlock';
import Episode from '../components/@types/Episode';

const episodes: Array<Episode> = [
  {
    'id': 21,
    'thumbnail': 'thumbnail_placeholder.png',
    'episodeOrder': 12,
    'Season': {
      'id': 7,
      'seasonOrder': 1,
      'title': 'Goblin Slayer',
      'background': 'thumbnail_placeholder.png',
    },
  },
];

const componentSetup = (
  <VideoBlock
    title={'Newest episodes'}
    episodes={episodes}
    viewAllLink={'/newest_episodes'}
  />
);

test('VideoBlock component is rendering properly', () => {
  const component = render(
    <MemoryRouter>
      {componentSetup}
    </MemoryRouter>
  );

  expect(component).toMatchSnapshot();
});