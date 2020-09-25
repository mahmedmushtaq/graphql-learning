const gql = require('graphql-tag');
const { ApolloServer } = require('apollo-server');

const typeDefs = gql`
  type User {
    email: String!
    avatar: String
    friends: [User!]!
  }

  input UserInput {
    email: String
  }

  type Query {
    #   me query returns User Type
    me: User!
    user(input: UserInput!): User
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
      };
    },
  },
  // this is used to override parent value of resolver
  // User: {
  //   email(User) {
  //     console.log('type is = ', type);
  //   },
  // },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(4000, () => {
  console.log('server is listening on the port 4000');
});