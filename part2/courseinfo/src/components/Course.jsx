const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

const Part = (props) => {
  return (
    <li>
      {props.parts.name} {props.parts.exercises}
    </li>
  );
};

const Content = (props) => {
  return (
    <ul>
      {props.parts.map((part, index) => (
        <Part key={index} parts={part} />
      ))}
    </ul>
  );
};

const Total = (props) => {
  // let total = 0;
  // for (let i = 0; i < props.parts.length; i++) {
  //   total += props.parts[i].exercises;
  // }
  const total = props.parts.reduce((sum, order) => sum + order.exercises, 0);
  return (
    <div>
      <h4>total of {total} exercises</h4>
      {/* <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p> */}
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          <Header course={course} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </li>
      ))}
    </ul>
  );
};

export default Courses;
