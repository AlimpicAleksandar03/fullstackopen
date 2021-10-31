import React, { useState, useEffect } from "react";
import personService from "./services/service";
import People from "./components/people";
import Filter from "./components/filter";
import PersonForm from "./components/form";
import Notification from "./components/notification";
import Error from "./components/error";
const App = () => {
    const [people, setPeople] = useState([]);
    const [filter, setFilter] = useState("");
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        personService.fetchAll().then((resp) => setPeople(resp));
    }, []);
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
            number: newNumber,
        };
        const existingPerson = people.find(
            (person) => person.name == newPerson.name
        );

        if (existingPerson) {
            if (
                window.confirm(
                    `${existingPerson.name} already exists in phonebook, replace old number with new one?`
                )
            ) {
                personService
                    .updateNumber(newPerson, existingPerson.id)
                    .then((updatedPerson) =>
                        setPeople(
                            [updatedPerson].concat(
                                ...people.filter(
                                    (person) =>
                                        person.name !== existingPerson.name
                                )
                            )
                        )
                    )
                    .then(() => {
                        setMessage("Number updated");
                        setTimeout(() => {
                            setMessage(null);
                        }, 1500);
                    })
                    .catch((err) => {
                        setError(
                            `Information of ${newPerson.name} has already been removed from server`
                        );
                        console.log(err);
                        setTimeout(() => {
                            setError(null);
                        }, 1500);
                    });
            }
        } else {
            personService
                .create(newPerson)
                .then((resp) => setPeople([resp, ...people]))
                .then(() => {
                    setMessage(`${newPerson.name} is added to phone book`);
                    setTimeout(() => {
                        setMessage(null);
                    }, 1500);
                });
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
                  name.toLowerCase().includes(filter.toLowerCase())
              )
            : people;
    const deleteUser = personService.deleteUser;
    return (
        <div>
            <h2>Phonebook</h2>
            <Error error={error} />
            <Notification message={message} />
            <Filter updateFilter={updateFilter} />
            <PersonForm
                name={newName}
                number={newNumber}
                onSubmit={addPerson}
                updateName={updateName}
                updateNumber={updateNumber}
            />
            <h2>Numbers</h2>
            <People
                people={peopleList}
                deleteUser={deleteUser}
                setPeople={setPeople}
                allPeople={people}
            />
        </div>
    );
};

export default App;
