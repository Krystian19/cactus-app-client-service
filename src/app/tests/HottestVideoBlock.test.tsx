import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';

import HottestVideoBlock from '../components/shared/HottestVideoBlock';
import Episode from '../components/@types/Episode';

const episodes: Array<Episode> = [
  {
    'id': 21,
    'thumbnail': 'thumbnail_placeholder.png',
    'episode_order': 12,
    'Release': {
      'id': 7,
      'releaseOrder': 1,
      'title': 'Goblin Slayer',
      'background': 'thumbnail_placeholder.png',
      'Anime': {
        'id': 9,
        'title': 'Goblin Slayer'
      },
    },
  },
];


// Setup language locale support
addLocaleData([...locale_en, ...locale_es]);

const componentSetup = (
  <IntlProvider locale="en">
    <HottestVideoBlock
      title="🔥 right now"
      episodes={episodes}
      viewAllLink="/hottest_episodes"
    />
  </IntlProvider>
);

test('HottestVideoBlock component is rendering properly', () => {
  const component = render(
    <MemoryRouter>
      {componentSetup}
    </MemoryRouter>
  );

  expect(component).toMatchSnapshot();
});
