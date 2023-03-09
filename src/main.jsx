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

const getAuth = () => {
  const token = localStorage.getItem("phonenumber-user-token");
  return token ? `bearer ${token}` : null;
};

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(), //aqui se guarda la informacion
  link: new HttpLink({
    headers: {
      authorization: getAuth(),
    },
    uri: "http://localhost:4000/", //no olvidar que esto se tiene que colocar en el archivo .env variable de entorno
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

//cliente.query({query: query})
// client.query({ query }).then((res) => console.log(res.data));
