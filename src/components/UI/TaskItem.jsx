import { useState } from "react";

const TaskItem = ({ state: { title, isFinished } }) => {
  const [check, setCheck] = useState(isFinished);
  return (
    <li className="flex gap-3 bg-white py-1 px-3 rounded">
      <input
        checked={check}
        onChange={() => setCheck(!check)}
        className=""
        type="checkbox"
        name=""
        id=""
      />
      <p className={`${check && "line-through text-[#64748b]"}`}>{title}</p>
    </li>
  );
};

export default TaskItem;
