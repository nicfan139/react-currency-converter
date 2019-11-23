// Import currency icons from local 'assets/' folder
import CADIcon from './assets/CAD.png';
import USDIcon from './assets/USD.png';
import EURIcon from './assets/EUR.png';
import GBPIcon from './assets/GBP.png';
import CNYIcon from './assets/CNY.png';
import JPYIcon from './assets/JPY.png';

// Currencies list
export const currencies = [
  {
    name: "Canadian Dollar",
    ticker: "CAD",
    icon: CADIcon,
    buyRate: 1,
    sellRate: 1,
    decimalPlaces: 2
  },
  {
    name: "U.S. Dollar",
    ticker: "USD",
    icon: USDIcon,
    buyRate: 1.2,
    sellRate: 1.3,
    decimalPlaces: 2
  },
  {
    name: "Euro",
    ticker: "EUR",
    icon: EURIcon,
    buyRate: 1.4,
    sellRate: 1.5,
    decimalPlaces: 2
  },
  {
    name: "British Pound Sterling",
    ticker: "GBP",
    icon: GBPIcon,
    buyRate: 1.6,
    sellRate: 1.7,
    decimalPlaces: 2
  },
  {
    name: "Chinese Yuan (Renminbi)",
    ticker: "CNY",
    icon: CNYIcon,
    buyRate: 0.18,
    sellRate: 0.20,
    decimalPlaces: 2
  },
  {
    name: "Japanese Yen",
    ticker: "JPY",
    icon: JPYIcon,
    buyRate: 0.011,
    sellRate: 0.012,
    decimalPlaces: 2
  }
]