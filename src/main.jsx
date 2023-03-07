import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(), //aqui se guarda la informacion
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

//cliente.query({query: query})
// client.query({ query }).then((res) => console.log(res.data));