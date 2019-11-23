import React from 'react';
import { currencies } from './currencies';
import CurrencyConverter from './CurrencyConverter';

const App = () => (
  <div style={{ textAlign: "center" }}>
    <h1>Two-Way Currency Converter</h1>
    <p>Built with <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a> by Nicolas Fan (<a href="https://github.com/nicfan139" target="_blank" rel="noopener noreferrer">@nicfan139</a>)</p>
    <p><em>Instant conversions on every input change and currency select.</em></p>
    <CurrencyConverter
      currencies={currencies}
      dpPrecision={4}
    />
  </div>
);

export default App;
