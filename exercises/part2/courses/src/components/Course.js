import React from "react";
const Course = ({ course }) => {
    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
        </div>
    );
};
const Header = ({ title }) => {
    return <h3>{title}</h3>;
};
const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => (
                <Part
                    key={part.id}
                    name={part.name}
                    exercises={part.exercises}
                />
            ))}
            <strong>
                total of:{" "}
                {parts
                    .map((p) => p.exercises)
                    .reduce((sum, exercise) => sum + exercise)}{" "}
                exercises
            </strong>
        </>
    );
};
const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

export default Course;
