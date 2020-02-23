const {ApolloServer, gql} = require('apollo-server-lambda');
const {GraphQLDateTime} = require('graphql-iso-date');
const {colorData} = require('./colors-fixture.js')

const typeDefs = gql`
  scalar DateTime

  type Palette {
    code: String!
    colors: [PaletteColor]!
    likes: Int!
    created_at: DateTime!
    updated_at: DateTime!
  }

  type HSL {
    hue: Int
    saturation: Int
    lightness: Int
  }

  type RGB {
    red: Int
    green: Int
    blue: Int
  }

  type PaletteColor {
    position: Int
    hex: String
    name: String
    hsl: HSL
    rgb: RGB
  }

  type Query {
    palettes: [Palette]
    palette: Palette
  }
`;

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    palettes(parent, {filters}) {
      const palettes = colorData.map(color => {
        const color1 = color.code.substring(0, 6)
        const color2 = color.code.substring(6, 12)
        const color3 = color.code.substring(12, 18)
        const color4 = color.code.substring(18, 24)
  
        return {
          code: color.code,
          likes: 0,
          colors: [
            {position: 1, hex: `#${color1}`},
            {position: 2, hex: `#${color2}`},
            {position: 3, hex: `#${color3}`},
            {position: 4, hex: `#${color4}`},
          ],
          created_at: new Date(),
          updated_at: new Date()
        }
      })
      return palettes
    },
    palette(parent, {filters}) {
      return {}
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
});

exports.handler = server.createHandler({
  cors: {
    origin: '*'
  }
});
