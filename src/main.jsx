import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  // HttpLink,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("phonenumber-user-token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

// const getAuth = () => {
//   const token = localStorage.getItem("phonenumber-user-token");
//   return token ? `bearer ${token}` : null;
// };

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql",
    options: {
      reconnect: true,
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(), //aqui se guarda la informacion
  // link: authLink.concat(httpLink),
  link: splitLink,
});

// const client = new ApolloClient({
//   connectToDevTools: true,
//   cache: new InMemoryCache(), //aqui se guarda la informacion
//   link: new HttpLink({
//     headers: {
//       authorization: getAuth(),
//     },
//     uri: "http://localhost:4000/", //no olvidar que esto se tiene que colocar en el archivo .env variable de entorno
//   }),
// });

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

//cliente.query({query: query})
// client.query({ query }).then((res) => console.log(res.data));
