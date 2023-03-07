const Persons = ({ persons }) => {
  if (persons === null) return null;
  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.id}>
          <p>
            {p.name} {p.phone}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
