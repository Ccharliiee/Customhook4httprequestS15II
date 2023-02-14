import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hooks/useHttp";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    fetchTasks({
      url: "https://react-http-6b4a6.firebaseio.com/tasks.json",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      rpLoader: (tasksData) => {
        const loadedTasks = [];

        for (const taskKey in tasksData) {
          loadedTasks.push({ id: taskKey, text: tasksData[taskKey].text });
        }

        setTasks(loadedTasks);
      },
    });
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
