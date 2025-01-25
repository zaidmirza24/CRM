import React, { useState } from "react";
import { useTask } from "./TaskContext";

const CreateTask = () => {
  const {addTask} = useTask() 
  const [formData, setFormData] = useState({
    name: "",
    status: "Planned",
    assignedUser: "",
    dateStart: "",
    timeStart: "",
    dateEnd: "",
    timeEnd: "",
    teams: "",
    attachment: null, 
    priority: "Normal",
    parent: "",
    description: "",
  });

  // State for storing tasks
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add the current form data to the tasks array
    setTasks((prevTasks) => [...prevTasks, formData]);
    addTask(formData) //// Add task to the ContextApi state

    // Reset the form
    setFormData({
      name: "",
      status: "Planned",
      assignedUser: "",
      dateStart: "",
      timeStart: "",
      dateEnd: "",
      timeEnd: "",
      teams: "",
      attachment: null,
      priority: "Normal",
      parent: "",
      description: "",
    });

    alert("Task added successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-2xl font-semibold mb-4">Task -- Create</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter task name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="Planned">Planned</option>
              <option value="In Process">In Process</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date Start</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="dateStart"
                value={formData.dateStart}
                onChange={handleChange}
                className="w-1/2 border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="time"
                name="timeStart"
                value={formData.timeStart}
                onChange={handleChange}
                className="w-1/2 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date End</label>
            <div className="flex gap-2">
              <input
                type="date"
                name="dateEnd"
                value={formData.dateEnd}
                onChange={handleChange}
                className="w-1/2 border border-gray-300 rounded-md p-2"
              />
              <input
                type="time"
                name="timeEnd"
                value={formData.timeEnd}
                onChange={handleChange}
                className="w-1/2 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        {/* Attachment and Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Attachment</label>
            <input
              type="file"
              name="attachment"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Assigned User and Teams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Assigned User</label>
            <input
              type="text"
              name="assignedUser"
              value={formData.assignedUser}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter user name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teams</label>
            <input
              type="text"
              name="teams"
              value={formData.teams}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter team name"
            />
          </div>
        </div>

        {/* Parent */}
        <div>
          <label className="block text-sm font-medium mb-1">Parent</label>
          <input
            type="text"
            name="parent"
            value={formData.parent}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter parent task"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter task description"
            rows="4"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>

      {/* Display the saved tasks */}
      {/* <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Saved Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks saved yet.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task, index) => (
              <li
                key={index}
                className="border border-gray-300 rounded-md p-4"
              >
                <p><strong>Name:</strong> {task.name}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Assigned User:</strong> {task.assignedUser}</p>
                <p><strong>Description:</strong> {task.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default CreateTask;
