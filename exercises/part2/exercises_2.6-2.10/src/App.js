import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
    const [newName, setNewName] = useState("");
    const addPerson = (e) => {
        e.preventDefault();
        const newPerson = { name: newName, id: persons.length + 1 };
        setPersons(persons.concat(newPerson));
        setNewName("");
    };
    const updateName = (e) => {
        const name = e.target.value;
        setNewName(name);
    };
    const names = persons.map((p) => p.name);
    for (let name of names) {
        if (names.indexOf(name) != names.lastIndexOf(name)) {
            setPersons(
                persons
                    .slice(0, names.indexOf(name))
                    .concat(persons.slice(names.indexOf(name) + 1)),
            );
            alert(`${name} is already added to phone book`);
        }
    }
    console.log(persons);
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={updateName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((person) => (
                    <Person name={person.name} key={person.id} />
                ))}
            </div>
        </div>
    );
};
const Person = ({ name }) => {
    return <div>{name}</div>;
};

export default App;
