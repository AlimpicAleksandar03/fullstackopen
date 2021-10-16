import React, { useState } from "react";

const App = () => {
    const [people, setPeople] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const getMaxId = () => Math.max(...people.map((person) => person.id));

    const addPerson = (e) => {
        e.preventDefault();

        if (!newName || newName.length === 0) {
            return alert("Name cannot be empty");
        }
        if (!newNumber || newNumber.length === 0) {
            return alert("Number cannot be empty");
        }

        const newPerson = {
            name: newName,
            id: getMaxId() + 1,
            number: newNumber,
        };

        if (people.find(({ name }) => name === newPerson.name)) {
            alert(`${newPerson.name} is already added to phone book`);
        } else {
            setPeople([newPerson, ...people]);
        }
        setNewName("");
        setNewNumber("");
    };

    const updateNumber = (e) => {
        const number = e.target.value;
        setNewNumber(number);
    };

    const updateName = (e) => {
        const name = e.target.value;
        setNewName(name);
    };
    const updateFilter = (event) => {
        const input = event.target.value;
        setFilter(input);
    };

    const peopleList =
        filter.length > 0
            ? people.filter(({ name }) =>
                  name.toLowerCase().includes(filter.toLowerCase()),
              )
            : people;
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter updateFilter={updateFilter} />
            <PersonForm
                name={newName}
                number={newNumber}
                onSubmit={addPerson}
                updateName={updateName}
                updateNumber={updateNumber}
            />
            <h2>Numbers</h2>
            <People people={peopleList} />
        </div>
    );
};
const Person = ({ name, number }) => {
    return (
        <li>
            {name} &mdash; {number}
        </li>
    );
};
const People = ({ people }) => {
    return (
        <ul>
            {people.map((person) => (
                <Person
                    name={person.name}
                    number={person.number}
                    key={person.id}
                />
            ))}
        </ul>
    );
};
const PersonForm = ({ name, number, updateName, updateNumber, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <label>
                Name: <input value={name} onChange={updateName} />
            </label>
            <label>
                Number: <input value={number} onChange={updateNumber} />
            </label>
            <button type="submit">Add</button>
        </form>
    );
};
const Filter = ({ updateFilter }) => {
    return (
        <label>
            Filter: <input onChange={updateFilter} />
        </label>
    );
};

export default App;
