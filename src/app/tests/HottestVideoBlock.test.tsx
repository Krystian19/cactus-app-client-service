import React from 'react';
import { render, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import HottestVideoBlock from '../components/shared/HottestVideoBlock';
import Episode from '../components/@types/Episode';

const episodes: Array<Episode> = [
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

test('HottestVideoBlock component shell working properly', () => {
  const component = shallow(
    <MemoryRouter>
      {componentSetup}
    </MemoryRouter>
  );

  expect(component).toMatchSnapshot();
});
