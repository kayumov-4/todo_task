import { createContext, useState } from "react";
import useTodoApi from "../service/useTodoApi";
export const DataContext = createContext();

const DataContextWrapper = ({ children }) => {
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [othersTasks, setOtherTasks] = useState([]);
  const fetchAllTasks = () => {
    useTodoApi.getAll().then((res) => {
      const today = res.data.filter((el) => el.category === "today");
      const tomorrow = res.data.filter((el) => el.category === "tomorrow");
      const others = res.data.filter((el) => el.category === "others");
      setTodayTasks(today);
      setTomorrowTasks(tomorrow);
      setOtherTasks(others);
    });
  };

  return (
    <DataContext.Provider
      value={{
        todayTasks,
        setTodayTasks,
        tomorrowTasks,
        setTomorrowTasks,
        othersTasks,
        setOtherTasks,
        fetchAllTasks,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextWrapper;
