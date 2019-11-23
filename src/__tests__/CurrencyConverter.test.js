import React from 'react';
import ReactDOM from 'react-dom';
import { currencies } from '../currencies';
import CurrencyConverter from '../CurrencyConverter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CurrencyConverter currencies={currencies} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
