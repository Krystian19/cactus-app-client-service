import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import HottestVideoBlock from '../components/shared/HottestVideoBlock';
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
      'Anime': {
        'id': 9,
        'title': 'Goblin Slayer'
      },
    },
  },
];

const componentSetup = (
  <HottestVideoBlock
    title="🔥 right now"
    episodes={episodes}
    viewAllLink="/hottest_episodes"
  />
);

test('HottestVideoBlock component is rendering properly', () => {
  const component = render(
    <MemoryRouter>
      {componentSetup}
    </MemoryRouter>
  );

  expect(component).toMatchSnapshot();
});
