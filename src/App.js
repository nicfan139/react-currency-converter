import React from 'react';
import CurrencyConverter from './CurrencyConverter';

const App = () => (
  <div style={{ textAlign: "center" }}>
    <h1>Two-Way Currency Converter</h1>
    <p>
      Built with <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React</a> by Nicolas Fan (<a href="https://github.com/nicfan139" target="_blank" rel="noopener noreferrer">@nicfan139</a>)
    </p>
    <p><em>Instant conversions on every input change and currency select.</em></p>
    <p><em>Base currency set to "CAD". Rates extracted from <a href="https://exchangeratesapi.io/" target="_blank" rel="noopener noreferrer">exchangeratesapi.io</a>.</em></p>
    <CurrencyConverter
      base="CAD"
      ratePrecision={4}
    />
  </div>
);

export default App;
