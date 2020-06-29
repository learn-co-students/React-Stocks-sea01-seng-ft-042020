import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input id="Alph" type="checkbox" value="Alphabetically" checked={null} onChange={(event) => props.sortStocks(event)}/>
        Alphabetically
      </label>
      <label>
        <input id="Price" type="checkbox" value="Price" checked={null} onChange={(event) => props.sortStocks(event)}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={(event) => props.filterStocks(event)}>
          <option value="All">All</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );

}


export default SearchBar;
