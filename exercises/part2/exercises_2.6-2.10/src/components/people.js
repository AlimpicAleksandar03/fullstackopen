import React from "react";
const Person = ({ name, number, deleteUser, id, setPeople, allPeople }) => {
    return (
        <li>
            {name} &mdash; {number}
            <button
                onClick={() => {
                    if (window.confirm(`Delete ${name}?`)) {
                        return deleteUser(id).then(() =>
                            setPeople(
                                allPeople.filter((person) => person.id !== id)
                            )
                        );
                    }
                    return;
                }}
            >
                Delete
            </button>
        </li>
    );
};
const People = ({ people, deleteUser, setPeople, allPeople }) => {
    return (
        <ul>
            {people.map(({ name, number, id }) => (
                <Person
                    name={name}
                    number={number}
                    key={id}
                    deleteUser={deleteUser}
                    id={id}
                    setPeople={setPeople}
                    allPeople={allPeople}
                />
            ))}
        </ul>
    );
};
export default People;
