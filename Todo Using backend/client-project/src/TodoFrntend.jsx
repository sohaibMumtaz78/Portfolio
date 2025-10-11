import axios from 'axios'
import React from 'react'
import { baseURL } from '../utitls/constant'

const TodoFrntend = ({ input, setInput, saveToDo }) => {

  return (
    <div>
        <main>
            <div>
                <h1>Todo App</h1>
                <div className="inpur-holder">
                  <input value={input} onChange={(e) =>setInput(e.target.value)} type="text"  placeholder='Add a ToDo '/>
                  <button onClick={saveToDo}>Add</button>
                </div>
            </div>
        </main>
      
    </div>
  )
}

export default TodoFrntend
