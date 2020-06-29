import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {

    const { stocks } = this.props

    return (
      <div>
        <h2>Stocks</h2>
        {
          this.createStocks(stocks)
        }
      </div>
    );
  }

  createStocks = (stocks) => {
    return stocks.map (stock => <Stock stock={stock} id={stock.id} key={stock.id} handleClick={this.handleClick}/>)
  }

  handleClick = (id) => {
    this.props.portfolioChange("Market", id - 1)
  }

}

export default StockContainer;
