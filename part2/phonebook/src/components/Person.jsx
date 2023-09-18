const Person = ({ person, filterName }) => {
  if (person.name.toLowerCase().includes(filterName)) {
    return (
      <li>
        {person.name} {person.number}
      </li>
    );
  }
};
export default Person;
