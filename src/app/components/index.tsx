import React from 'react';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

import { IntlProvider, addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_es from 'react-intl/locale-data/es';

import languages from '../../translations';
import Routes from './views';

const httpLink = new HttpLink({
  uri: '/graphql',
  fetch,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache().restore(window['__APOLLO_STATE__']),
});

// Setup language locale support
addLocaleData([...locale_en, ...locale_es]);

// Gets the language ISO code out of the html tag
const language = document.documentElement.lang;

export default (): JSX.Element => (
  <ApolloProvider client={client}>
    <IntlProvider locale={language} messages={languages[language]}>
      <Routes />
    </IntlProvider>
  </ApolloProvider>
);