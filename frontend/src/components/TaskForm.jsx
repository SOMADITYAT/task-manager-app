import axios from "axios";
import React, { useState } from "react";
import { useSocket } from "../context/SocketContext"; // Import socket context to use the socket

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    comments: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    assignee: "",
    role: "",
  });

    const socket = useSocket(); // Use socket

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the task data to the backend
      const response = await axios.post(
        "http://localhost:8080/api/tasks",
        formData
      );
      const newTask = response.data;

      // Emit the event for real-time task creation
      if (socket) {
        socket.emit("createTask", newTask); // Notify other clients via socket
      }

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        status: "pending",
        comments: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        assignee: "",
        role: "",
      });

      alert("Task created successfully!"); // Optionally notify the user
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
        ></textarea>
      </div>

      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label>Comments:</label>
        <textarea
          name="comments"
          value={formData.comments}
          onChange={handleChange}
          placeholder="Comments"
        ></textarea>
      </div>

      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Assignee:</label>
        <input
          type="text"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          placeholder="Assignee"
        />
      </div>

      <div>
        <label>Role:</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
        />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default TaskForm;
