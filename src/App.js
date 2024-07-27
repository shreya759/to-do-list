import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, isEditing: false }]);
      setTask('');
    }
  };

  const editTask = (index) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        task.isEditing = true;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const saveTask = (index, newText) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        task.text = newText;
        task.isEditing = false;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  defaultValue={task.text}
                  onBlur={(e) => saveTask(index, e.target.value)}
                />
                <button onClick={() => saveTask(index, task.text)}>Save</button>
              </>
            ) : (
              <>
                {task.text}
                <button className="edit" onClick={() => editTask(index)}>Edit</button>
                <button className="delete" onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
