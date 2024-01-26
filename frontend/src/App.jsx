import "./App.css";
import { useEffect, useState } from "react";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import Persons from "./Components/Persons";
import personService from "./Services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [notif, setNotif] = useState("");
  const [errorNotif, setErrorNotif] = useState("");

  let newId = `${persons.length + 1}`;
  let newPerson = { name: newName, number: newNumber, id: newId };

  function handleSubmit(e) {
    e.preventDefault();
    let duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .updateNumber(duplicatePerson.id, newPerson)
          .then(() => {
            console.log("Updated the number succesfully!");
            fetchData();
            setNotif(`The number for ${newPerson.name} has been changed`);
            setTimeout(() => {
              setNotif(null);
            }, 3000);
          })
          .catch((error) => {
            console.log(error);
            {
              setErrorNotif(
                `Information of ${newPerson.name} had already been removed from server`
              );
            }
          });
      }
    } else {
      personService
        .createObj(newPerson)
        .then(() => {
          console.log("Added new person succesfully");
          setPersons([...persons, newPerson]);
          setNotif(`Added ${newPerson.name}`);
          setTimeout(() => {
            setNotif(null);
          }, 3000);
        })
        .catch((error) => console.error(error));
    }
  }

  function handleDelete(id) {
    personService.deleteObj(id).then(() => {
      const afterDelete = persons.filter((person) => person.id !== id);
      setPersons(afterDelete);
      setNotif(`Deleted ${newPerson.name}`);
      setTimeout(() => {
        setNotif(null);
      }, 3000);
    });
  }

  async function fetchData() {
    try {
      const res = await personService.getAll();
      const data = await res.data;
      setPersons(data);
    } catch (error) {
      console.error(error);
    }
  }

  //Separated fetchData to isolate dependencies
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFiltered(
      persons.filter((person) =>
        person.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, persons]);

  return (
    <div>
      <h2>Phonebook</h2>
      {notif && <p className="notification">{notif}</p>}
      {errorNotif && <p className="notification error">{errorNotif}</p>}
      <Filter setSearchInput={setSearchInput} />
      <PersonForm
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredList={filtered} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
