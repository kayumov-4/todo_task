import { useEffect, useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import TaskItem from "./components/UI/TaskItem";
import useTodoApi from "./service/useTodoApi";

const App = () => {
  const [input, setInput] = useState("");
  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [othersTasks, setOtherTasks] = useState([]);

  const getTodayTasks = () => {
    useTodoApi.getAll().then((res) => {
      const fetchedToday = res.data.filter((el) => el.category == "today");
      setTodayTasks(fetchedToday);
    });
  };
  const getTomorrowTasks = () => {
    useTodoApi.getAll().then((res) => {
      const fetchedTomorrow = res.data.filter(
        (el) => el.category == "tomorrow"
      );
      setTomorrowTasks(fetchedTomorrow);
    });
  };
  const getOtherTasks = () => {
    useTodoApi.getAll().then((res) => {
      const fetchedOthers = res.data.filter((el) => el.category == "others");
      setOtherTasks(fetchedOthers);
    });
  };

  const addTodoFunc = () => {
    if (input.trim().length > 0) {
      const regexExp = new RegExp(
        /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi
      );
      const newTodo = {
        id: Date.now(),
        title: input,
        isFinished: false,
        priority: "low",
        category: "today",
      };
      if (input.toLowerCase().includes("bugun")) {
        let result = input.replace("bugun", "");
        newTodo.title = result;
        if (result.includes("!muhim")) {
          newTodo.priority = "high";
        }
        setTodayTasks([...todayTasks, newTodo]);
      } else if (input.toLowerCase().includes("ertaga")) {
        let result = input.replace("ertaga", "");
        newTodo.title = result;
        newTodo.category = "tomorrow";
        if (result.includes("!muhim")) {
          newTodo.priority = "high";
        }
        setTomorrowTasks([...tomorrowTasks, newTodo]);
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
        newTodo.title = result;
        newTodo.category = "others";

        if (result.includes("!muhim")) {
          newTodo.priority = "high";
        }
        setOtherTasks([...othersTasks, newTodo]);
      } else {
        if (input.includes("!muhim")) {
          newTodo.priority = "high";
        }
        setTodayTasks([...todayTasks, newTodo]);
      }
      console.log(newTodo);
      useTodoApi.addTodo(newTodo);

      setInput("");
    } else {
      alert("Please fill the field !");
    }
  };
  useEffect(() => {
    getTodayTasks();
    getTomorrowTasks();
    getOtherTasks();
    console.log(todayTasks);
    console.log(tomorrowTasks);
    console.log(othersTasks);
  }, []);
  return (
    <div className=" bg-white border-4 w-[1240px] mx-auto h-fit pb-5 mb-10 mt-16 rounded-2xl ">
      <div className=" container px-5 mx-auto">
        {/* TOP */}
        <div className="w-[550px] mt-10 flex h-10 gap-3 items-center mx-auto ">
          <Input
            required
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
