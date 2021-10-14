import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const names = persons.map((p) => p.name);
    const updateNumber = (e) => {
        const number = e.target.value;
        setNewNumber(number);
    };
    console.log(names);
    const addPerson = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
            id: persons.length + 1,
            number: newNumber,
        };
        if (names.includes(newPerson.name)) {
            alert(`${newPerson.name} is already added to phone book`);
            setNewName("");
            setNewNumber("");
        } else {
            setPersons(persons.concat(newPerson));
            setNewName("");
            setNewNumber("");
        }
    };
    const updateName = (e) => {
        const name = e.target.value;
        setNewName(name);
    };
    const filter = (e) => {
        const match = new RegExp(e.target.value, "i");
        setPersons(persons.filter((person) => match.test(person.name)));
    };
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                Filter: <input onChange={filter} />
            </div>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={updateName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={updateNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map((person) => (
                    <Person
                        name={person.name}
                        number={person.number}
                        key={person.id}
                    />
                ))}
            </div>
        </div>
    );
};
const Person = ({ name, number }) => {
    return (
        <div>
            {name} {number}
        </div>
    );
};

export default App;
