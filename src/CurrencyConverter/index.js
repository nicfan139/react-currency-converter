import React from 'react';
import './styles/index.scss';
import propTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import { currencies } from './CurrenciesRef';
import CurrencyDropdown from './CurrencyDropdown';

class CurrencyConverter extends React.Component {
  state = {
    currenciesList: "",
    currencyA: "",
    currencyB: "",
    currencyAval: "",
    currencyBval: "",
    selectedOptionA: "",
    selectedOptionB: "",
  }

  componentDidMount() {
    // Fetch rates from exchangeratesapi.io
    fetch(`https://api.exchangeratesapi.io/latest?base=${this.props.base}`)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
      alert("Unable to fetch rates from exchangeratesapi.io :(");
    })
    .then(data => {
      const rates = data.rates;

      currencies.forEach(c => {
        c.rate = rates[c.ticker];
      })

      this.setState({
        currenciesList: currencies,
        currencyA: currencies[0],
        currencyB: currencies[1],
        currencyAval: "",
        currencyBval: "",
        selectedOptionA: currencies[0].ticker,
        selectedOptionB: currencies[1].ticker,
      }, () => document.getElementById("currency-widget-input-a").focus())
    })
  }

  showCurrencyDropdown = (input) => {
    input==='A'
    ? 
    this.setState({ showCurrencyDropdownA: true })
    :
    this.setState({ showCurrencyDropdownB: true })
  }

  closeCurrencyDropdown = () => {
    this.setState({
      showCurrencyDropdownA: false,
      showCurrencyDropdownB: false
    });
  }

  onSelectCurrencyA = (selectedCurrencyticker) => {
    // Define variables and grab matching currency from 'currenciesList'
    const { currenciesList, currencyA, currencyB, currencyAval, currencyBval } = this.state;
    const selectedCurrency = currenciesList.find(currency => currency.ticker === selectedCurrencyticker);
    if ((currencyB.ticker === selectedCurrency.ticker) && (currencyB.ticker === "CAD")) {
      // Condition for when selected currency for Input A is 'CAD' AND Input B is 'CAD'
      // Set Input A to 'CAD', and Input B to previously selected currency for Input A
      this.setState({
        currencyA: selectedCurrency,
        currencyB: currencyA,
        currencyAval: currencyBval,
        currencyBval: parseFloat((currencyBval * currencyA.rate).toFixed(currencyA.decimalPlaces)),
        selectedOptionA: selectedCurrency.ticker,
        selectedOptionB: currencyA.ticker,
      })
    } else if (currencyB.ticker !== "CAD") {
      // Condition for when NEITHER selected currency for Input A, nor Input B is 'CAD'
      // Set Input B to 'CAD'
      this.setState({
        currencyA: selectedCurrency,
        currencyB: currenciesList[0],
        currencyBval: parseFloat((currencyAval / selectedCurrency.rate).toFixed(currenciesList[0].decimalPlaces)),
        selectedOptionA: selectedCurrency.ticker,
        selectedOptionB: currenciesList[0].ticker
      })
    } else {
      // Condition for when Selected currency for Input A IS NOT 'CAD'
      this.setState({
        currencyA: selectedCurrency,
        currencyBval: parseFloat((currencyAval / selectedCurrency.rate).toFixed(currencyB.decimalPlaces)),
        selectedOptionA: selectedCurrency.ticker,
      });
    }
    this.closeCurrencyDropdown();
    console.log(`Selected currency to give: ${selectedCurrencyticker}`);
  }

  onSelectCurrencyB = (selectedCurrencyticker) => {
    // Define variables and grab matching currency from 'currenciesList'
    const { currenciesList, currencyA, currencyB, currencyAval, currencyBval } = this.state;
    const selectedCurrency = currenciesList.find(currency => currency.ticker === selectedCurrencyticker);
    if ( (currencyA.ticker === selectedCurrency.ticker) && (currencyA.ticker === 'CAD') ) {
      // Condition for when selected currency for Input B is 'CAD' AND Input A is 'CAD'
      // Set Input B to 'CAD', and Input A to previously selected currency for Input B
      this.setState({
        currencyA: currencyB,
        currencyB: selectedCurrency,
        currencyAval: currencyBval,
        currencyBval: parseFloat((currencyBval / currencyB.rate).toFixed(selectedCurrency.decimalPlaces)),
        selectedOptionA: currencyB.ticker,
        selectedOptionB: selectedCurrency.ticker
      })
    } else if ( currencyA.ticker !=='CAD' ) {
      // Condition for when neither selected currency for Input B, nor Input A is 'CAD'
      // Set Input A to 'CAD'
      this.setState({
        currencyA: currenciesList[0],
        currencyB: selectedCurrency,
        currencyBval: parseFloat((currencyAval * selectedCurrency.rate).toFixed(selectedCurrency.decimalPlaces)),
        selectedOptionA: currenciesList[0].ticker,
        selectedOptionB: selectedCurrency.ticker
      })
    } else {
      // Condition for when Selected currency for Input B IS NOT 'CAD'
      this.setState({
        currencyB: selectedCurrency,
        currencyBval: parseFloat((currencyAval * selectedCurrency.rate).toFixed(selectedCurrency.decimalPlaces)),
        selectedOptionB: selectedCurrency.ticker
      });
    }
    this.closeCurrencyDropdown();
    console.log(`Selected currency to receive: ${selectedCurrencyticker}`);
  }

  onChangeHandler = (e, input) => {
    const { currencyA, currencyB } = this.state;
    if (input === "A") {
      // For every digit change in Input A, change the value of Input B
      const newValueA = e.target.value;
      this.setState({
        currencyAval: newValueA,
        currencyBval: currencyA.ticker === "CAD" ? parseFloat((newValueA * currencyB.rate ).toFixed(currencyB.decimalPlaces)) : parseFloat((newValueA / currencyA.rate).toFixed(currencyB.decimalPlaces))
      })
    } else if (input === "B") {
      // For every digit change in Input B, change the value in Input A
      const newValueB = e.target.value;
      this.setState({
        currencyAval: currencyB.ticker === "CAD" ? parseFloat((newValueB * currencyA.rate).toFixed(currencyA.decimalPlaces)) : parseFloat((newValueB / currencyB.rate).toFixed(currencyA.decimalPlaces)),
        currencyBval: newValueB
      })
    }
  }

  onSwapButtonClick = () => {
    const { currencyA, currencyB, currencyBval } = this.state;
    if (currencyA.ticker === "CAD") {
      // Condition if Input A was 'CAD' when the user clicked the switch button
      this.setState({
        currencyA: currencyB,
        currencyB: currencyA,
        currencyAval: currencyBval,
        currencyBval: parseFloat((currencyBval / currencyB.rate).toFixed(currencyB.decimalPlaces)),
        selectedOptionA: currencyB.ticker,
        selectedOptionB: currencyA.ticker
      });
    }
    else if (currencyB.ticker === "CAD") {
      // Condition if Input B was 'CAD' when the user clicked the switch button
      this.setState({
        currencyA: currencyB,
        currencyB: currencyA,
        currencyAval: currencyBval,
        currencyBval: parseFloat((currencyBval * currencyA.rate).toFixed(currencyA.decimalPlaces)),
        selectedOptionA: currencyB.ticker,
        selectedOptionB: currencyA.ticker
      })
    }
    console.log("Currency Inputs switched!")
  }

  render() {
    const {
      currenciesList,
      currencyA,
      currencyB,
      currencyAval,
      currencyBval,
      showCurrencyDropdownA,
      showCurrencyDropdownB
    } = this.state;
    const { ratePrecision } = this.props;

    // Show loading animation while data gets fetched from the API
    if (!currenciesList) { return <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> }

    return (
      <Fade>
        <div className="widgetContainer">
          <div className="converterTool">
            { /* Input A - "You Have" Currency Selector */ }
            <div className="currencyInputContainer">
              { /* Input A Label */}
              <label className="currencyInputLabel">
                <i className="fas fa-minus" />&nbsp;&nbsp;
                FOR:
              </label>
              <div className="currencyInputRow">
                { /* Input A Select Dropdown Link */}
                <div
                  onClick={() => this.showCurrencyDropdown('A')}
                  className="currencyDropdownLink"
                >            
                  <img
                    src={currencyA.icon}
                    alt={currencyA.name}
                    className="currencyIcon"
                  />
                  <span className="dropdownIcon">
                    {currencyA.ticker}&nbsp;&nbsp;
                    <i className="fas fa-angle-down"></i>
                  </span>
                </div>
                { /* Input A Select Dropdown */
                  showCurrencyDropdownA && (
                  <CurrencyDropdown
                    currenciesList={currenciesList}
                    currentSelectedTicker={currencyA.ticker}
                    onSelectCurrency={this.onSelectCurrencyA}
                    closeCurrencyDropdown={this.closeCurrencyDropdown}
                  />
                )}
                { /* Input A Value Field */ }
                <input
                  id="currency-widget-input-a"
                  type="number"
                  step="0.000000001"
                  min="0"
                  pattern="\d"
                  value={currencyAval}
                  onChange={e => this.onChangeHandler(e, 'A')}
                  autoComplete="nope"
                  className="currencyInput"
                />
              </div>
            </div>


            { /* Swap button */ }
            <div
              onClick={() => this.onSwapButtonClick()}
              className="swapBtnContainer"
            >
              <i className="fas fa-exchange-alt" />
            </div>


            { /* Input B - "You Receive" Currency Selector */ }
            <div className="currencyInputContainer">
              { /* Input B Label */ }
              <label className="currencyInputLabel">
                <i className="fas fa-plus" />&nbsp;&nbsp;
                I'LL GET:
              </label>
              <div className="currencyInputRow">
                { /* Input B Select Dropdown Link */}
                <div
                  onClick={() => this.showCurrencyDropdown('B')}
                  className="currencyDropdownLink"
                >
                  <img
                    src={currencyB.icon}
                    alt={currencyB.name}
                    className="currencyIcon"
                  />
                  <span className="dropdownIcon">
                    {currencyB.ticker}&nbsp;&nbsp;
                    <i className="fas fa-angle-down"></i>
                  </span>
                </div>
                { /* Input B Select Dropdown */
                  showCurrencyDropdownB && (
                  <CurrencyDropdown
                    currenciesList={currenciesList}
                    currentSelectedTicker={currencyB.ticker}
                    onSelectCurrency={this.onSelectCurrencyB}
                    closeCurrencyDropdown={this.closeCurrencyDropdown}
                  />
                )}
                { /* Input B Value Field */}
                <input
                  type="number"
                  step="0.000000001"
                  min="0"
                  pattern="\d"
                  value={currencyBval}
                  onChange={(e) => this.onChangeHandler(e, 'B')}
                  autoComplete="nope"
                  className="currencyInput"
                />
              </div>
            </div>
          </div>

          { /* Rate Display - always expressed as "cost in CAD" (i.e. CAD goes on the right-hand side) */ }
          <div className="rateDisplay">
            <div className="rateDisplayRow">
              <label className="rateLabel">
                <i className="fas fa-chart-area"></i>&nbsp; 
                Rate:
              </label>
              &nbsp;
              <div className="rateText">
                1 { currencyA.ticker === 'CAD' && currencyB.ticker }{ currencyA.ticker !== 'CAD' && currencyA.ticker }
                &nbsp;
                ≈
                &nbsp;
                { /* Show sell rate on the right-side if user DEPOSITS 'CAD' */
                  currencyA.ticker === 'CAD' && parseFloat(1 / currencyB.rate).toFixed(ratePrecision)
                }
                { /* Show buy rate on the right-side if user WITHDRAWS 'CAD' */
                  currencyA.ticker !== 'CAD' && parseFloat(1 / currencyA.rate).toFixed(ratePrecision)
                }
                &nbsp;
                { currencyA.ticker === 'CAD' && currencyA.ticker }
                { currencyA.ticker !== 'CAD' && currencyB.ticker }
              </div>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

CurrencyConverter.propTypes = {
  base: propTypes.string.isRequired,
  ratePrecision: propTypes.number.isRequired
}

export default CurrencyConverter;