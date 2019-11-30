import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components';

import { GQLAnime } from '@cactus-app/types';

const Anime: GQLAnime = { id: 1, title: 'Adios', created_at: '', updated_at: '' };

hydrate(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ),
  document.getElementById('root'),
);
