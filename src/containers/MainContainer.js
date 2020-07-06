import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";
const API = "http://localhost:3000/stocks";
class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      portfolio: [],
      sort: "",
      filter: "All"
    };
  }

  fetchStocks = () => {
    return fetch(API).then((res) => res.json());
  };

  componentDidMount() {
    this.fetchStocks().then((data) =>
      this.setState({
        stocks: data,
      })
    );
  }

  buyStock = (stock) => {
    // console.log(stock)
    if (!this.state.portfolio.find((pStock) => pStock.id === stock.id)) {
      this.setState({
        portfolio: [...this.state.portfolio, stock],
      });
    }
  };

  sellStock = (stock) => {
    this.setState({
      portfolio: this.state.portfolio.filter(pStock => pStock.id !== stock.id)
    })
  }

  handleSort = (event) => {
    // console.log(event.target.value)
    this.setState({
      sort: event.target.value
    })
  }
  
  handleFilter = event => {
    this.setState({
      filter: event.target.value
    })
  }

  filteredAndSortedStocks = () => {
    let filteredStocks = [...this.state.stocks]

    if(this.state.filter !== "All"){
      filteredStocks = filteredStocks.filter(stock => stock.type === this.state.filter)
    }
      switch (this.state.sort) {
        case "Alphabetically":
          return filteredStocks.sort((a, b) => a.name > b.name ? 1 : -1)
        case "Price":
          return filteredStocks.sort((a, b) => a.price - b.price)
        default:
          return filteredStocks
      }
  }

  render() {
    let stocks = this.filteredAndSortedStocks()
    return (
      <div>
        <SearchBar handleSort={this.handleSort} handleFilter={this.handleFilter} sortTerm={this.state.sort}/>

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={stocks}
              buyStock={this.buyStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer portfolioStocks={this.state.portfolio} sellStock={this.sellStock}/>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
