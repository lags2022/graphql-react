import "./App.css";
import { gql, useQuery } from "@apollo/client";
//useQuery es un hook que nos permite hacer consultas a graphql
import Persons from "./Persons";

const ALL_PERSONS = gql`
  query {
    allPersons {
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

function App() {
  const { loading, error, data } = useQuery(ALL_PERSONS);
  if (error) return <span style={{ color: red }}>{error}</span>;
  return (
    <div className="App">
      {loading ? <p>Loading...</p> : <Persons persons={data?.allPersons} />}
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
