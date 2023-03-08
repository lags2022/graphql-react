import { useQuery } from "@apollo/client";
//useQuery es un hook que nos permite hacer consultas a graphql
import { ALL_PERSONS } from "./graphql-queries";

export const usePersons = () => {
  const result = useQuery(ALL_PERSONS);
  // const { loading, error, data } = useQuery(ALL_PERSONS,{pollInterval: 2000});
  return result;
};
