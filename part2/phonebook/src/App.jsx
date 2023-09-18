import axios from "axios";
import { useEffect, useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        if (
          window.confirm(
            `${persons[i].name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const updatedPerson = { ...persons[i], number: newNumber };
          personService.update(persons[i].id, updatedPerson).then(() => {
            const newPersons = [...persons];
            newPersons[i] = updatedPerson;
            setPersons(newPersons);
          });
        }

        // window.alert(
        //   `Name ${newName} or/and number ${newNumber} is already added to phonebook`
        // );
        return setNewName(""), setNewNumber("");
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (id) => {
    const personToRemove = persons.find((person) => person.id === id);

    if (!personToRemove) {
      console.error(`Person with ID ${id} not found.`);
      return;
    }

    // const confirmed = window.confirm(`Delete ${personToRemove.name} ?`);

    if (window.confirm(`Delete ${personToRemove.name} ?`)) {
      personService.remove(id).then(() => {
        const newPersons = persons.filter((person) => person.id !== id);
        setPersons(newPersons);
      });
    }
  };

  const handlePersonChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        persons={persons}
        filterName={filterName}
        removePerson={removePerson}
      />
      {/* <div>
        filer shown with:
        <input value={filterName} onChange={handleFilterChange} />
      </div> */}

      {/* <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> */}

      {/* <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} filterName={filterName} />
        ))}
      </ul> */}
    </div>
  );
};

export default App;
