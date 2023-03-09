import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { CREATE_PERSON } from "./persons/graphql-mutations";

export default function PersonForm({ notifyError }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    // refetchQueries: [{ query: ALL_PERSONS }], //esto es para que cuando se cree un nuevo person se refresque la lista de persons
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS });
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, response.data.addPerson],
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createPerson({
      variables: { name, phone, street, city }, //aqui muta con los datos que le pasamos en los useStates
    });

    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>Create a new person</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={({ target }) => setPhone(target.value)}
        />
        <input
          placeholder="Street"
          value={street}
          onChange={({ target }) => setStreet(target.value)}
        />
        <input
          placeholder="City"
          value={city}
          onChange={({ target }) => setCity(target.value)}
        />
        <button type="submit">Add Person</button>
      </form>
    </div>
  );
}
