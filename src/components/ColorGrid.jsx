import './ColorGrid.scss'
import React, { useEffect } from 'react';
import ColorCard from './ColorCard.jsx'
import {ApolloClient, InMemoryCache, gql, useQuery} from '@apollo/client';

// initialize a GraphQL client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${process.env.API_URL}/graphql`,
  name: `react-${process.env.APOLLO_CLIENT_NAME}`
});

const LIST_PALETTES = gql`
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

export const ColorGrid = () => {
  const {data, loading, error} = useQuery(LIST_PALETTES, {client});
  if (loading || error) {
    return <p>{error ? error.message : 'Loading...'}</p>;
  }
  console.log('data', data)

  return (
    <div className="color-grid row">
      {data.palettes.map((palette, i) => {
        return <ColorCard key={i}
                          code={palette.code}
                          colors={palette.colors}
                          likes={palette.likes}
                          created_at={palette.created_at}
                          updated_at={palette.updated_at} />
      })}
    </div>
  )

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

export default ColorGrid;
