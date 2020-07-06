import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderPStocks = () => this.props.portfolioStocks.map(stock => <Stock stock={stock} key={stock.id} stockAction={this.props.sellStock}></Stock>)
  
  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
          this.renderPStocks()
          }
      </div>
    );
  }

}

export default PortfolioContainer;
