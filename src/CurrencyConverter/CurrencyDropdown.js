import React from 'react';
import './styles/CurrencyDropdown.scss';
import propTypes from 'prop-types';
import Fade from 'react-reveal/Fade';

class CurrencyDropdown extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', e => this.handleClickOutside(e));
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', e => this.handleClickOutside(e));
  }

  // Set the wrapper ref as 'currencyDropdown' renders
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  // Close dropdown if user clicks outside the dropdown area
  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closeCurrencyDropdown();
    }
  }

	render() {
		const { currenciesList, currentSelectedTicker, onSelectCurrency, closeCurrencyDropdown } = this.props;
		return (
			<Fade duration={250}>
		    <div
		    	ref={this.setWrapperRef}
		    	className="currencyDropdown"
		    >
		      { currenciesList.map(currency => {
		          return (
		            <div
		              key={currency.ticker}
		              onClick={e => (currentSelectedTicker !== currency.ticker) ? onSelectCurrency(currency.ticker) : closeCurrencyDropdown() }
		              className="currencyDropdownItem"
		              style={{ backgroundColor: currentSelectedTicker === currency.ticker ? "#143642" : "white" }}	              
		            >
		              <img
		              	src={currency.icon}
		              	alt={currency.ticker}
		              	className="currencyDropdownIcon"
		              />
		              <p
										className="currencyDropdownItemText"
										style={{ color: currentSelectedTicker === currency.ticker ? "whitesmoke" : "#143642" }}
									>
		              	{currency.ticker} - {currency.name}
		              </p>
		            </div>
		          )
		        })
		      }
		    </div>
	    </Fade>
		)		
	}
}

CurrencyDropdown.propTypes = {
	currenciesList: propTypes.array.isRequired,
	currentSelectedTicker: propTypes.string.isRequired,
	onSelectCurrency: propTypes.func.isRequired,
	closeCurrencyDropdown: propTypes.func.isRequired
}

export default CurrencyDropdown;