import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import { Link } from "react-router-dom";
import { useTask } from "./TaskContext";

const Tasks = () => {
  const {task,getTasks} = useTask()
  console.log(task)
  const [allChecked, setAllChecked] = useState(false); // Track "Select All"
  const [taskList, setTaskList] = useState([
    { id: 1, name: "Irving's Sport Goods Branch", status: "Planned", date: "Mon Apr 24 05:30", user: "Jack Adams", checked: false },
    { id: 2, name: "Janeville", status: "Planned", date: "Mon Apr 24 05:30", user: "Jack Adams", checked: false },
    { id: 3, name: "Irving's Sport Goods Branch", status: "Planned", date: "Mon Apr 12 05:30", user: "Guy Walsh", checked: false },
    { id: 4, name: "Irving's Sport Goods Branch", status: "Planned", date: "Mon Apr 12 05:30", user: "Leonard Friesen", checked: false },
    { id: 5, name: "Irving's Sport Goods Branch", status: "Planned", date: "Mon Apr 12 05:30", user: "David Hauck", checked: false },
    { id: 6, name: "Irving's Sport Goods Branch", status: "In progress", date: "Mon Apr 12 05:30", user: "Cesar O'Keefe", checked: false },
    { id: 7, name: "Irving's Sport Goods Branch", status: "In progress", date: "Mon Apr 12 05:30", user: "Cesar O'Keefe", checked: false },
    { id: 8, name: "Irving's Sport Goods Branch", status: "In progress", date: "Mon Apr 12 05:30", user: "Cesar O'Keefe", checked: false },
    { id: 9, name: "Irving's Sport Goods Branch", status: "Completed", date: "Mon Apr 12 05:30", user: "Cesar O'Keefe", checked: false },
    { id: 10, name: "Irving's Sport Goods Branch", status: "Completed", date: "Mon Apr 12 05:30", user: "Cesar O'Keefe", checked: false },
  ]);

  const currentDate = new Date().toLocaleDateString('en-gb').split("/")[0]
  const totalTasks = taskList.length;
  const taskLeft = totalTasks - (taskList.filter((task)=>( task.status === "Completed")).length)
  // Aggregate task counts by status
  const statusCounts = taskList.reduce(
    (counts, task) => {
      counts[task.status] += 1;
      return counts;
    },
    { Planned: 0,"In progress": 0, Completed: 0 }
  );

  // Calculate percentage for each status
  const getPercentage = (count) => Math.round((count / totalTasks) * 100);

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    setAllChecked(!allChecked);
    setTaskList((prevList) =>
      prevList.map((task) => ({ ...task, checked: !allChecked }))
    );
  };

  // Handle individual checkbox toggle
  const handleTaskCheck = (id) => {
    const updatedList = taskList.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task
    );

    setTaskList(updatedList);

    // Dynamically update "Select All" checkbox state
    setAllChecked(updatedList.every((task) => task.checked));
  };

  return (
    <div className="bg-white">
      {/* Left Side (Search Bar + Task Table) */}
      <div className="flex ">
        <div>
        <div className="w-[542px]">
        <SearchInput />
      </div>

      <div className="tableHai">
        {/* Task Table */}
        <div className="overflow-x-auto p-4 w-[919px] rounded-xl">
          <table className="min-w-full bg-[#D1D1D1] border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={allChecked}
                    className="w-4 h-4 accent-[#CD4A4A] shadow-xl"
                  />
                </th>
                <th className="px-4 py-2 border-b text-left">Name</th>
                <th className="px-4 py-2 border-b text-left">Status</th>
                <th className="px-4 py-2 border-b text-left">Date</th>
                <th className="px-4 py-2 border-b text-left">Assigned User</th>
              </tr>
            </thead>
            <tbody>
              {taskList.map((task) => (
                <tr
                  key={task.id}
                  className={`my-12 ${
                    task.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 border-b">
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => handleTaskCheck(task.id)}
                      className="w-4 h-4 accent-[#CD4A4A]"
                    />
                  </td>
                  <td className="px-2 py-2 border-b">{task.name}</td>
                  <td className="px-2 py-2 border-b">
                    <div
                      className={`px-4 py-1 max-w-screen-lg text-center text-sm font-medium rounded-lg ${
                        task.status === "Planned"
                          ? "bg-green-500 text-white"
                          : task.status === "Completed" ? "bg-purple-500 text-white" : task.status === "In progress" ? "bg-blue-500 text-white" : ""
                      }`}
                    >
                      {task.status}
                    </div>
                  </td>
                  <td className="px-4 py-2 border-b">{task.date}</td>
                  <td className="px-4 py-2 border-b">{task.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
        </div>
      {/* Right Side (Task Analysis + Tasks Left)*/}
        <div className="flex flex-col gap-10" >
          {/* Task Analysis */}
          <div className="border-[1px] border-gray shadow-xl rounded-lg w-[312px] h-[422px] p-8">
            <div className="flex justify-between">
              <span className="font-normal text-2xl">Task Analysis</span>
              <span>
                <Link to='/more/create-task'>
                  <img src="public/Images/Tasks/PlusButton.png" alt="" />
                </Link>
              </span>
            </div>
            <div>
              <div className="text-sm">Total Tasks</div>
              <div className="text-4xl font-medium">{totalTasks}</div>
            </div>
            <div className="mt-4  h-[240px]">
              {Object.entries(statusCounts).map(([status, count], index) => {
                const percentage = getPercentage(count);
                const size = percentage * 3; // Scale size dynamically
                // Define specific positions for each circle
                const positions = [
                  { top: "-28px", left: "42px" }, // Circle 1
                  { top: "-81px", left: "134px" }, // Circle 2
                  { top: "-160px", left: "22px" }, // Circle 3
                ];

                const position = positions[index] || { top: "0px", left: "0px" };

                return (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                      width: `${size}px`,
                      height: `${size}px`,
                      top: position.top,
                      left: position.left,
                    }}
                    className={`flex flex-nowrap justify-center items-center rounded-full text-white text-sm  font-bold ${status === "Planned"
                        ? "bg-green-500"
                        : status === "In progress"
                          ? "bg-purple-500"
                          : "bg-blue-500"
                      }`}
                  >
                    {percentage}%
                  </div>
                );
              })}
            </div>

            {/* Labels  */}
            <div className="flex text-xs gap-3 text-[#000000CC]">
              <div>
                <span className="h-3 w-3 aspect-square bg-green-500 text-green-500 mr-1">12</span>
                <span>Completed</span>
              </div>
              <div >
                <span className="h-3 w-3 bg-purple-500 text-purple-500 mr-1">12</span>
                <span>Planned</span>
              </div>
              <div>
                <span className="h-3 w-3 bg-blue-500 text-blue-500 mr-1">12</span>
                <span>In Progress</span>
              </div>
            </div>
          </div>

          {/* Task Left */}
          <div className="border-[1px] border-gray shadow-md rounded-lg w-[302px] p-8">
            <div className="flex justify-between">
              <h1 className="text-2xl font-normal text-[#595959]">Todays</h1>
              <div className="flex flex-col items-center"><h1 className="text-3xl font-bold text-[#000000A6] ">{totalTasks}</h1><span className="text-gray-500 text-xs">Total Task</span></div>
            </div>
            <div className="flex items-center justify-start gap-2 ">
              <span className="text-2xl font-bold text-[#CD4A4A]">0{taskLeft}</span><span className="text-xl text-[#CD4A4A]">Left</span>
            </div>
            {/* Todays Task List */}
            <div className="mt-5 text-2xl  text-[#000000A1]">
              <ul>
                {
                  taskList.map((task)=>(
                    task.date.split(" ")[2] === currentDate ? <li className="list-disc">{task.name}</li>  : ""
                  ))
                }
              </ul>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Tasks;
