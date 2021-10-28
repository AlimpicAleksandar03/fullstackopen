import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [allCountries, getAllCountries] = useState([]);
    const [match, setMatch] = useState("");
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            getAllCountries(response.data);
        });
    }, []);
    const filterCountries = (e) => {
        const input = e.target.value.toLowerCase();
        const filtered = allCountries.filter((country) =>
            country.name.common.toLowerCase().includes(input)
        );
        setCountries(filtered);
        setMatch(input);
    };
    return (
        <div>
            <Filter onChange={filterCountries} value={match} />
            <Countries countries={countries} setCountries={setCountries} />
        </div>
    );
};
const Filter = ({ onChange, value }) => {
    return (
        <label>
            Filter: <input value={value} onChange={onChange} />
        </label>
    );
};
const Countries = ({ countries, setCountries }) => {
    if (countries.length === 1) {
        return <Country country={countries[0]} />;
    } else if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (countries.length > 1) {
        return (
            <div>
                {countries.map((country) => (
                    <p key={country.cca3}>
                        {country.name.common}
                        <button onClick={() => setCountries([country])}>
                            Show
                        </button>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};
const Country = ({ country }) => {
    console.log(country);
    const languages = [];
    for (let key of Object.keys(country.languages)) {
        languages.push(country.languages[key]);
    }
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.name.common}></img>
        </div>
    );
};
export default App;
