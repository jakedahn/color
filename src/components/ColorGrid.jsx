import './ColorGrid.scss'
import React, { useEffect } from 'react';
import ColorCard from './ColorCard.jsx'

import colors from 'Pages/color-data.js'

import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'https://graphql.color.lol',
  name: `react-${process.env.APOLLO_CLIENT_NAME}`
});

// write a GraphQL query that asks for names and codes for all countries
const LIST_COUNTRIES = gql`
query {
  palettes {
    code
    colors {
      position
      hex
    }
    likes
    created_at
    updated_at

  }
}`;

// create a component that renders a select input for coutries
function CountrySelect() {
  const [country, setCountry] = useState('US');
  const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }

  return (
    <select value={country} onChange={event => setCountry(event.target.value)}>
      {data.countries.map(country => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </select>
  );
}


export const ColorGrid = ({ data }) => {
  return (
    <div className="color-grid row">
      {colors.map((color, i) => {
        return <ColorCard key={i} id={color.id} code={color.code} date={color.date} likes={color.likes} />
      })}
    </div>
  )
}

export default ColorGrid;
