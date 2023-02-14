import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useHttp from "../hooks/useHttp";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: addTasks } = useHttp();

  const enterTaskHandler = async (taskText) => {
    addTasks({
      url: "https://react-http-6b4a6.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
      rpLoader: (tasksData) => {
        const generatedId = tasksData.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
      },
    });
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
