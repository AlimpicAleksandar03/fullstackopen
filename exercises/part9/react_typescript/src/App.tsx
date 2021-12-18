import React from "react";
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
    },
  ];

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseDescription extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CourseDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}
type CoursePart =
  | SpecialCourse
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart;

interface PartComponentProps {
  part: CoursePart;
}
interface HeaderProps {
  title: string;
}
interface TotalProps {
  courseParts: CoursePart[];
}
interface ContentProps {
  courseParts: CoursePart[];
}
interface SpecialCourse extends CourseDescription {
  requirements: String[];
  type: "special";
}

const Header = ({ title }: HeaderProps) => {
  return <h1>{title}</h1>;
};

const Part = ({ part }: PartComponentProps) => {

  switch (part.type) {
    case "normal": {
      return (
        <p>
          <strong>{part.name}</strong> <span>{part.exerciseCount}</span>{" "}
          {part.description}
        </p>
      );
    }
    case "groupProject": {
      return (
        <p>
          <strong>{part.name}</strong>
          <span>{part.exerciseCount}</span> Project exercises:{" "}
          {part.groupProjectCount}
        </p>
      );
    }
    case "submission": {
      return (
        <p>
          <strong>{part.name}</strong> <span>{part.exerciseCount}</span>{" "}
          {part.description}
          Submit to: {part.exerciseSubmissionLink}
        </p>
      );
    }
    case "special": {
      return (
        <p>
          <strong>{part.name}</strong> <span>{part.exerciseCount}</span>{" "}
          {part.description}
        </p>
      );
    }
    default: {
      return null;
    }
  }
};
const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </>
  );
};

const Total = ({ courseParts }: TotalProps) => {
  return (
    <p>
      Number of exercises
      {courseParts.reduce((acc, part) => {
        return acc + part.exerciseCount;
      }, 0)}
    </p>
  );
};
export default App;
