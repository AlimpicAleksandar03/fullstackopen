import React from "react";

const Header = (props) => {
    return <h1>{props.course}</h1>;
};
const Part1 = (props) => {
    return (
        <p>
            {props.part1} {props.exercises1}
        </p>
    );
};
const Part2 = (props) => {
    return (
        <p>
            {props.part2} {props.exercises2}
        </p>
    );
};
const Part3 = (props) => {
    return (
        <p>
            {props.part3} {props.exercises3}
        </p>
    );
};
const Total = (props) => {
    const { exercises1, exercises2, exercises3 } = props;
    const sum = exercises1 + exercises2 + exercises3;
    return <p>Number of exercises {sum}</p>;
};
const Content = () => {
    return (
        <>
            <Part1 part1='Fundamentals of React' exercises1={10} />
            <Part2 part2='Using props to pass data' exercises2={7} />
            <Part3 part3='State of a component' exercises3={14} />
        </>
    );
};
const App = () => {
    return (
        <div>
            <Header course='Half Stack application development' />
            <Total exercises1={10} exercises2={7} exercises3={14} />
            <Content />
        </div>
    );
};

export default App;
