import { gql } from "@apollo/client";

export const PERSON_ADDED = gql`
    subscription {
        personAdded {
            id
            name
            phone
            address {
                street
                city
            }
        }
    }
`;
