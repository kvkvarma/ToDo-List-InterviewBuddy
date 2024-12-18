import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
export default function App(){ 

  const [toDos,setToDos] = useState([]);
  const getData = async()=>{
    try{
      const response = await axios.get('http://localhost:8073/api/data');
      setToDos(response.data);
    }
    catch(error){
      console.log('Data Fetching Error:',error);
    }
  }
  useEffect(()=>{
    getData();
  },[])

  return (
    <div>
      <form>
        <input type="text"  required/>
        <button >Add</button>
      </form>
      <ul>
        {toDos.map((todo)=>(
            <li key={todo.id}>{todo.id} is going through {todo.description}</li>
        ))}
      </ul>
    </div>
  )
}
