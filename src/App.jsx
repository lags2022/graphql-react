import "./App.css";
import Persons from "./Persons";
import PersonForm from "./PersonForm";
import { usePersons } from "./persons/custom-hooks";
import { useState } from "react";
import Notify from "./Notify";
import PhoneForm from "./PhoneForm";
import LoginForm from "./LoginForm";
import { useApolloClient } from "@apollo/client";

function App() {
  const { loading, error, data } = usePersons();
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(() =>
    localStorage.getItem("phonenumber-user-token")
  );
  const client = useApolloClient();

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (error) return <span style={{ color: red }}>{error}</span>;
  return (
    <div className="App">
      <Notify errorMessage={errorMessage} />
      {loading ? <p>Loading...</p> : <Persons persons={data?.allPersons} />}
      {token ? (
        <button onClick={logout}>Cerrar sesion</button>
      ) : (
        <LoginForm notifyError={notifyError} setToken={setToken} />
      )}
      <PhoneForm notifyError={notifyError} />
      <PersonForm notifyError={notifyError} />
    </div>
  );
}

export default App;

// useEffect(() => {
//   fetch("http://localhost:4000/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       query: `
//         query {
//           allPersons{
//             name
//           }
//         }
//       `,
//     }),
//   })
//     .then((res) => res.json())
//     .then((res) => console.log(res.data));
// }, []);
