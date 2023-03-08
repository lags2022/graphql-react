import { gql } from "@apollo/client";

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $phone: String!
    $street: String!
    $city: String!
  ) {
    addPerson(name: $name, phone: $phone, street: $street, city: $city) {
      name
      phone
      id
      address {
        city
        street
      }
      id
    }
  }
`;
