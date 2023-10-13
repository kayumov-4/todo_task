import { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import TaskItem from "./components/UI/TaskItem";

const App = () => {
  const [input, setInput] = useState("");
  const [todayTasks, setTodayTasks] = useState(
    JSON.parse(localStorage.getItem("today")) || []
  );
  const [tomorrowTasks, setTomorrowTasks] = useState(
    JSON.parse(localStorage.getItem("tomorrow")) || []
  );
  const [othersTasks, setOtherTasks] = useState(
    JSON.parse(localStorage.getItem("other")) || []
  );

  const addTodoFunc = () => {
    if (input.trim().length > 0) {
      const regexExp = new RegExp(
        /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi
      );

      if (input.toLowerCase().includes("bugun")) {
        let result = input.replace("bugun", "");
        const newTodo = {
          id: Date.now(),
          title: result,
          isFinished: false,
        };

        setTodayTasks([...todayTasks, newTodo]);
        localStorage.setItem("today", JSON.stringify([...todayTasks, newTodo]));
      } else if (input.toLowerCase().includes("ertaga")) {
        let result = input.replace("ertaga", "");
        const newTodo = {
          id: Date.now(),
          title: result,
          isFinished: false,
        };
        setTomorrowTasks([...tomorrowTasks, newTodo]);
        localStorage.setItem(
          "tomorrow",
          JSON.stringify([...tomorrowTasks, newTodo])
        );
      } else if (
        input
          .toLowerCase()
          .split(" ")
          .some((el) => el.match(regexExp))
      ) {
        let result = input
          .split(" ")
          .filter((el) => !el.match(regexExp))
          .join(" ");
        console.log(result);
        const newTodo = {
          id: Date.now(),
          title: result,
          isFinished: false,
        };
        setOtherTasks([...othersTasks, newTodo]);
        localStorage.setItem(
          "other",
          JSON.stringify([...othersTasks, newTodo])
        );
      } else {
        const newTodo = {
          id: Date.now(),
          title: input,
          isFinished: false,
        };
        setTodayTasks([...todayTasks, newTodo]);
        localStorage.setItem("today", JSON.stringify([...todayTasks, newTodo]));
      }
      setInput("");
    } else {
      alert("Please fill the field !");
    }
  };

  return (
    <div className=" bg-white border-4 w-[1240px] mx-auto h-fit pb-5 mb-10 mt-16 rounded-2xl ">
      <div className=" container px-5 mx-auto">
        {/* TOP */}
        <div className="w-[550px] mt-10 flex h-10 gap-3 items-center mx-auto ">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="Taskname"
          />
          <Button onClick={addTodoFunc} className="w-40 bg-[#2096F3]">
            Add task
          </Button>
        </div>
        {/* TOP */}
        <div className="wrapper mt-10 flex justify-between">
          <div className="w-[48%] bg-blue-500 h-full p-4 rounded-2xl">
            <h2 className="text-[24px] text-white">Today</h2>
            <ul className="list-none flex flex-col gap-1">
              {todayTasks.length > 0 ? (
                todayTasks.map((todo, index) => {
                  return <TaskItem state={todo} key={index} />;
                })
              ) : (
                <h1 className="text-[16px] text-white">Hozircha bo'sh</h1>
              )}
            </ul>
          </div>
          <div className="w-[48%] h-fit">
            <div className="w-full bg-blue-500 h-full p-4 rounded-2xl">
              <h2 className="text-[24px] text-white">Tomorrow</h2>
              <ul className="list-none flex flex-col gap-1">
                {tomorrowTasks.length > 0 ? (
                  tomorrowTasks.map((todo, index) => {
                    return <TaskItem state={todo} key={index} />;
                  })
                ) : (
                  <h1 className="text-[16px] text-white">Hozircha bo'sh</h1>
                )}
              </ul>
            </div>
            <div className="w-full bg-blue-500 h-full p-4 rounded-2xl mt-4">
              <h2 className="text-[24px] text-white">Others</h2>
              <ul className="list-none flex flex-col gap-1">
                {othersTasks.length > 0 ? (
                  othersTasks.map((todo, index) => {
                    return <TaskItem state={todo} key={index} />;
                  })
                ) : (
                  <h1 className="text-[16px] text-white">Hozircha bo'sh</h1>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
