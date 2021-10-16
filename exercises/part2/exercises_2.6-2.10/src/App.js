import React, { useState } from "react";

const App = () => {
    const [people, setPeople] = useState([
        { name: "Arto Hellas", number: "040-123456", id: 1 },
        { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
        { name: "Dan Abramov", number: "12-43-234345", id: 3 },
        { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    ]);
    const [filter, setFilter] = useState('');
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const names = persons.map((p) => p.name);
    const updateNumber = (e) => {
        const number = e.target.value;
        setNewNumber(number);
    };
    console.log(names);
    const getMaxId = () => Math.max(...people.map(person => person.id));
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
    const updateFilter = (event) => {
        const input = event.target.value;
        setFilter(input);
    }

    const peopleList = filter.length > 0 ? people.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase())) : people;
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                Filter: <input onChange={updateFilter} />
            </div>
            <form onSubmit={addPerson}>
                <div>
                    Name: <input value={newName} onChange={updateName} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={updateNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {peopleList.map((person) => (
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
