import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Required for accessibility

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (editingTask) {
        await axios.put(
          `http://localhost:8080/api/tasks/${editingTask._id}`,
          formData
        );
      } else {
        await axios.post("http://localhost:8080/api/tasks", formData);
      }
      fetchTasks(); // Refresh task list
      setModalIsOpen(false); // Close the modal
      setEditingTask(null); // Reset the editing task
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
      }); // Reset form data
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData(task);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${id}`);
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-6">Task Manager</h1>
      <div className="py-4 px-4">
        <button
          onClick={() => setModalIsOpen(true)}
          className="ml-auto px-4 py-2 flex bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Create New Task
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Task Form Modal"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
        overlayClassName="fixed inset-0"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-auto relative">
          <h2 className="text-3xl font-semibold mb-4">
            {editingTask ? "Edit Task" : "Create Task"}
          </h2>
          <button
            onClick={() => setModalIsOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateOrUpdate();
            }}
            className="space-y-6"
          >
            <div className="flex flex-col ">
              <label htmlFor="title" className="text-lg font-medium mb-2">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
                placeholder="Task Title"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg font-medium mb-2">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
                placeholder="Task Description"
                required
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="status" className="text-lg font-medium mb-2">
                Status:
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="comments" className="text-lg font-medium mb-2">
                Comments:
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
                placeholder="Comments"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-lg font-medium mb-2">
                Start Date:
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-lg font-medium mb-2">
                End Date:
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="startTime" className="text-lg font-medium mb-2">
                Start Time:
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="endTime" className="text-lg font-medium mb-2">
                End Time:
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="assignee" className="text-lg font-medium mb-2">
                Assignee:
              </label>
              <input
                type="text"
                id="assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
                placeholder="Assignee"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="role" className="text-lg font-medium mb-2">
                Role:
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border rounded-md px-4 py-2 text-base"
                placeholder="Role"
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600"
              >
                {editingTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="overflow-x-auto py-4 px-4">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comments
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task, index) => (
              <tr
                key={task._id}
                className="hover:bg-gray-100 transition duration-150 ease-in-out"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.comments}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.startDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.startTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.endTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.assignee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {task.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-blue-600 hover:text-blue-900 font-semibold"
                  >
                    <i className="fas fa-edit"></i>{" "}
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
