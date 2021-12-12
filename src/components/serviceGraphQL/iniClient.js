import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
  } from "@apollo/client";
  
  const Client = () => {
  const client = new ApolloClient({
    uri: 'http://localhost:9092/graphql',
    cache: new InMemoryCache()
  });
};

  export { Client };

