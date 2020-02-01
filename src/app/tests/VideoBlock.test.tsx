import React from 'react';
import { render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';

import VideoBlock from '../components/shared/VideoBlock';

// Setup language locale support
addLocaleData([...locale_en, ...locale_es]);

const componentSetup = (
  <IntlProvider locale="en">
    <VideoBlock
      title="Newest episodes"
      episodes={[]}
      viewAllLink="/newest_episodes"
    />
  </IntlProvider>
);

test('VideoBlock component is rendering properly', () => {
  const component = render(
    <MemoryRouter>
      {componentSetup}
    </MemoryRouter>,
  );

  expect(component).toMatchSnapshot();
});
