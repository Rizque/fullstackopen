const Persons = ({ persons, filterName, removePerson }) => {
  return (
    <ul>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filterName)) {
          return (
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => removePerson(person.id)}>delete</button>
            </li>
          );
        }
      })}
    </ul>
  );
};
export default Persons;
