import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';

import HottestVideoBlock from '../components/shared/HottestVideoBlock';

// Setup language locale support
addLocaleData([...locale_en, ...locale_es]);

const componentSetup = (
  <IntlProvider locale="en">
    <HottestVideoBlock
      title="🔥 right now"
      episodes={[]}
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
