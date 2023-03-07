import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

const Persons = ({ persons }) => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);
  //no olvidar el useLazyQuery devuelve un array con dos elementos el primero es la funcion y el segundo es el resultado
  const [person, setPerson] = useState(null);

  const showPerson = (name) => {
    getPerson({ variables: { nameToSearch: name } });
  };

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson); //aqui graphql es predecible y siempre va a devolver un objeto con el nombre que le pusimos en el query
    }
  }, [result]);

  if (person) {
    return (
      <div>
        <h2>{person.name}</h2>
        <div>
          {person.address.street}, {person.address.city}
        </div>
        <div>{person.phone}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    );
  }
  if (persons === null) return null;

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((person) => (
        <div key={person.id} onClick={() => showPerson(person.name)}>
          <p>
            {person.name} {person.phone}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
