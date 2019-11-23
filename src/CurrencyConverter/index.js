import React from 'react';
import './styles/index.scss';
import propTypes from 'prop-types';
import Fade from 'react-reveal/Fade';
import CurrencyDropdown from './CurrencyDropdown';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    const currencies = this.props.currencies;
    this.state = {
      currenciesList: currencies,
      currencyA: currencies[0],
      currencyB: currencies[1],
      currencyAval: parseFloat( 100 * (currencies[1].sellRate).toFixed(currencies[0].decimalPlaces)),
      currencyBval: 100,
      selectedOptionA: currencies[0].ticker,
      selectedOptionB: currencies[1].ticker,
    }
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
        currencyBval: parseFloat((currencyBval / currencyA.sellRate).toFixed(currencyA.decimalPlaces)),
        selectedOptionA: selectedCurrency.ticker,
        selectedOptionB: currencyA.ticker,
      })
    } else if (currencyB.ticker !== "CAD") {
      // Condition for when NEITHER selected currency for Input A, nor Input B is 'CAD'
      // Set Input B to 'CAD'
      this.setState({
        currencyA: selectedCurrency,
        currencyB: currenciesList[0],
        currencyBval: parseFloat((currencyAval * selectedCurrency.buyRate).toFixed(currenciesList[0].decimalPlaces)),
        selectedOptionA: selectedCurrency.ticker,
        selectedOptionB: currenciesList[0].ticker
      })
    } else {
      // Condition for when Selected currency for Input A IS NOT 'CAD'
      this.setState({
        currencyA: selectedCurrency,
        currencyBval: parseFloat((currencyAval * selectedCurrency.buyRate).toFixed(currencyB.decimalPlaces)),
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
        currencyBval: parseFloat((currencyBval * currencyB.buyRate).toFixed(selectedCurrency.decimalPlaces)),
        selectedOptionA: currencyB.ticker,
        selectedOptionB: selectedCurrency.ticker
      })
    } else if ( currencyA.ticker !=='CAD' ) {
      // Condition for when neither selected currency for Input B, nor Input A is 'CAD'
      // Set Input A to 'CAD'
      this.setState({
        currencyA: currenciesList[0],
        currencyB: selectedCurrency,
        currencyBval: parseFloat((currencyAval * ( 1 / selectedCurrency.sellRate)).toFixed(selectedCurrency.decimalPlaces)),
        selectedOptionA: currenciesList[0].ticker,
        selectedOptionB: selectedCurrency.ticker
      })
    } else {
      // Condition for when Selected currency for Input B IS NOT 'CAD'
      this.setState({
        currencyB: selectedCurrency,
        currencyBval: parseFloat((currencyAval * ( 1 / selectedCurrency.sellRate )).toFixed(selectedCurrency.decimalPlaces)),
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
      if (currencyA.ticker === "CAD") {
        this.setState({
          currencyAval: newValueA,
          currencyBval: parseFloat((newValueA * ( 1 / currencyB.sellRate )).toFixed(currencyB.decimalPlaces))
        })
      } else {
        this.setState({
          currencyAval: newValueA,
          currencyBval: parseFloat((newValueA * currencyA.buyRate).toFixed(currencyB.decimalPlaces))
        })
      }
    } else if (input === "B") {
      // For every digit change in Input B, change the value in Input A
      const newValueB = e.target.value;
      if ( currencyB.ticker === "CAD" ) {
        this.setState({
          currencyAval: parseFloat((newValueB * ( 1 / currencyA.buyRate)).toFixed(currencyA.decimalPlaces)),
          currencyBval: newValueB
        })
      } else {
         this.setState({
          currencyAval: parseFloat((newValueB * currencyB.sellRate).toFixed(currencyA.decimalPlaces)),
          currencyBval: newValueB
        })
      }
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
        currencyBval: currencyBval * currencyB.buyRate,
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
        currencyBval: parseFloat((currencyBval / currencyA.sellRate).toFixed(currencyA.decimalPlaces)),
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
    const { dpPrecision } = this.props;
    return (
      <Fade>
        <div className="widgetContainer">
          <div className="converterTool">
            { /* Input A - "You Have" Currency Selector */ }
            <div className="currencyInputContainer">
              { /* Input A Label */}
              <label className="currencyInputLabel">
                <i className="fas fa-minus" />&nbsp;&nbsp;
                DEPOSIT
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
                WITHDRAW
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
                  currencyA.ticker === 'CAD' && parseFloat(currencyB.sellRate).toFixed(dpPrecision)
                }
                { /* Show buy rate on the right-side if user WITHDRAWS 'CAD' */
                  currencyA.ticker !== 'CAD' && parseFloat(currencyA.buyRate).toFixed(dpPrecision)
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
  currencies: propTypes.array.isRequired
}

export default CurrencyConverter;