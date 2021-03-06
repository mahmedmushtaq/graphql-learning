const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  enum ShoeType {
    CHAPPAL
    SHOES
  }

  type User {
    email: String!
    avatar: String
    friends: [User!]!
    shoes: [Shoes]
  }

  type Shoes {
    name: String!
    price: Int!
    type: ShoeType
    user: User
  }

  input UserInput {
    email: String
  }

  input ShoesInput {
    name: String!
    price: Int!
    type: ShoeType
  }

  type Query {
    #   me query returns User Type
    me: User!
    user(input: UserInput): User
  }

  type Mutation {
    newShoes(input: ShoesInput!): Shoes!
  }
`;

const resolvers = {
  Query: {
    me() {
      // fetch data from db
      // sample data is returning
      return {
        email: 'mahmedmushtaq296@gmail.com',
        avatar: 'http://yoda.png',
        friends: [],
      };
    },
    user(_, { input }) {
      console.log('user id = ', input);
      return {
        email: 'mahmedmushtaq296@gmail.com',
        shoesIds: [1, 2, 3],
      };
    },
  },

  Mutation: {
    newShoes(_, { input }) {
      return input;
    },
  },
  // this is used to override parent value of resolver
  User: {
    shoes(user) {
      // here get all user.shoesId and get all shoes By this shoes id from db
      console.log(user);
      return [
        {
          name: 'Test shoes',
          type: 'Cat',
        },
      ];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000, () => {
  console.log('server is listening on the port 4000');
});
