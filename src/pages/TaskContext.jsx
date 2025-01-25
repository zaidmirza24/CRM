import { createContext,useState,useContext } from "react";

//Custom Context Hook
export const TaskContext = createContext()

//Task Provider 
export const TaskProvider = ({children})=>{
    const [task, setTask] = useState([])

    const getTasks = () => {
      return task;
    };

    //Function to Add task
    const addTask = (task)=>{
        setTask((prevTasks)=>([...prevTasks,task]))
    }
    //Function to Update task
    const updateTask = (taskId, updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task, index) =>
            index === taskId ? { ...task, ...updatedTask } : task
          )
        );
      };

    // Function to delete a task
    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((_, index) => index !== taskId));
    };

    return (
        <TaskContext.Provider value={{ task, addTask, updateTask, deleteTask }}>
          {children}
        </TaskContext.Provider>
      );

}

// Custom Hook 
export const useTask = () => {
    const context = useContext(TaskContext);
  
    if (!context) {
      throw new Error("useTask must be used within a TaskProvider");
    }
  
    return context; // Exposes tasks, addTask, updateTask, deleteTask
  };