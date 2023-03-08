import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { EDIT_NUMBER } from "./persons/graphql-mutations";

export default function PhoneForm({ notifyError }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      notifyError("Person not found");
    }
  }, [result.data]); // eslint-disable-line

  const handleSubmit = (e) => {
    e.preventDefault();

    changeNumber({
      variables: { name, phone },
    });

    setName("");
    setPhone("");
  };

  return (
    <div>
      <h2>Edit Phone Number</h2>
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
        <button type="submit">Change Phone</button>
      </form>
    </div>
  );
}
