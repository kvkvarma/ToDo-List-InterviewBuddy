import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './App.css';
import { MdOutlineDelete,MdOutlineEdit  } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


export default function App() {
  const [toDos, setToDos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [newDescription, setNewDescription] = useState('');

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:8073/api/data');
      console.log('Fetched data:', response.data);
      setToDos(response.data);
    } catch (error) {
      console.log('Data Fetching Error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    const x = task.charAt(0).toUpperCase() + task.slice(1);

      try{
        await axios.post('http://localhost:8073/addTask', { x });
        setTask('');
        getData();
      } catch (error) {
        console.log('Error in Adding Task', error);
      }
  };

  const deleteRecord = async (refId) => {
    try {
      const response = await axios.delete(`http://localhost:8073/deleteTask/${refId}`);
      console.log('Delete response:', response.data); 
      getData(); 
    } catch (error) {
      console.log('Error while Deleting the Record:', error);
    }
  };

  const updateRecord = async (id) => {
    try {
      await axios.put(`http://localhost:8073/updateTask/${id}`, {
        description: newDescription,
      });
      setEditId(null);
      setNewDescription('');
      getData();
    } catch (error) {
      console.log('Error while Updating the Task:', error);
    }
  };

  return (
    <div className="todo-container">
    <form onSubmit={addTask} className="todo-form">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>

    <table className="todo-table">
      <thead>
        <tr>
          <th colSpan="3">To-Do List</th>
        </tr>
      </thead>
      <tbody>
        {toDos.map((todo) => (
          <tr key={todo.id}>
            <td className="left-column">
              {editId === todo.id ? (
                <div>
                  <input
                    type="text"
                    style={{ backgroundColor: 'gray' ,border:'none',padding:'4px 5px', borderRadius:'3px'}}
                    
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                  />
                  <button type="button" style={{marginLeft:'4px', backgroundColor:'#5050f5'}} onClick={() => updateRecord(todo.id)}>Update</button>
                  <button type="button" style={{marginLeft:'4px',backgroundColor:'#a3182d'}} onClick={() => setEditId(null)}>Cancel</button>
                </div>
              ) : (
                todo.description
              )}
            </td>
            <td>
            <button
                type="button"
                onClick={() => {
                  setEditId(todo.id);
                  setNewDescription(todo.description);
                }}
              >
                <MdOutlineEdit size={24} color='#080064'/>
              </button>
              
            </td>
            <td>
            {editId !== todo.id && (
                <button type="button" onClick={() => deleteRecord(todo.id)}><MdOutlineDelete size={24} color='red'/></button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}
