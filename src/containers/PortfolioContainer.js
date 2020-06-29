import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {

    const { stocks } = this.props

    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.createStocks(stocks)
          }
      </div>
    );
  }

  createStocks = (stocks) => {
    let a = 0
    return stocks.map (stock => <Stock stock={stock} id={a} key={a++} handleClick={this.handleClick}/>)
  }

  handleClick = (id) => {
    this.props.portfolioChange("Portfolio", id)
  }
}

export default PortfolioContainer;
