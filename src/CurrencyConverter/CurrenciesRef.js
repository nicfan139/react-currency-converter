// Import currency icons from local 'assets/' folder
import CADIcon from '../assets/CAD.png';
import USDIcon from '../assets/USD.png';
import EURIcon from '../assets/EUR.png';
import GBPIcon from '../assets/GBP.png';
import CNYIcon from '../assets/CNY.png';
import JPYIcon from '../assets/JPY.png';

// Currencies list
export const currencies = [
  {
    name: "Canadian Dollar",
    ticker: "CAD",
    icon: CADIcon,
    decimalPlaces: 2
  },
  {
    name: "U.S. Dollar",
    ticker: "USD",
    icon: USDIcon,
    decimalPlaces: 2
  },
  {
    name: "Euro",
    ticker: "EUR",
    icon: EURIcon,
    decimalPlaces: 2
  },
  {
    name: "British Pound Sterling",
    ticker: "GBP",
    icon: GBPIcon,
    decimalPlaces: 2
  },
  {
    name: "Chinese Yuan (Renminbi)",
    ticker: "CNY",
    icon: CNYIcon,
    decimalPlaces: 2
  },
  {
    name: "Japanese Yen",
    ticker: "JPY",
    icon: JPYIcon,
    decimalPlaces: 2
  }
]