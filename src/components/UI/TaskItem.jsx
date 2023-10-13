import { useState, useContext } from "react";
import useTodoApi from "../../service/useTodoApi";
import second from "../../assets/icons/delete.png";
import { DataContext } from "../../context/dataContext";
const TaskItem = ({ state: { title, isFinished, id } }, setBtn, btn) => {
  const [check, setCheck] = useState(isFinished);
  const {
    todayTasks,
    setTodayTasks,
    tomorrowTasks,
    setTomorrowTasks,
    othersTasks,
    setOtherTasks,
  } = useContext(DataContext);
  const handleCheck = () => {
    if (check == false) {
      setCheck(true);
      const newState = { isFinished: true };
      useTodoApi.updateTodo(id, newState);
    } else {
      setCheck(false);
      const newState = { isFinished: false };
      useTodoApi.updateTodo(id, newState);
    }
  };
  const deleteFunc = () => {
    useTodoApi.deleteTodo(id);
    const filtered = todayTasks.filter((el) => el.id != id);
    setTodayTasks(filtered);

    const filtered2 = tomorrowTasks.filter((el) => el.id != id);
    setTomorrowTasks(filtered2);

    const filtered3 = othersTasks.filter((el) => el.id != id);
    setOtherTasks(filtered3);
  };

  return (
    <li className="flex gap-3 bg-white py-1 px-3 rounded items-center justify-between">
      <div className="flex items-center gap-3">
        <input
          checked={check}
          onChange={handleCheck}
          className=""
          type="checkbox"
          name=""
          id=""
        />
        <p className={`${check && "line-through text-[#64748b]"}`}>{title}</p>
      </div>
      <button onClick={deleteFunc}>
        <img className="w-[24px] h-[24px]" src={second} alt="" />
      </button>
    </li>
  );
};

export default TaskItem;
