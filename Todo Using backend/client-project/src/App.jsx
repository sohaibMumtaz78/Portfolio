import React, { useEffect, useState } from 'react'
import TodoFrntend from './TodoFrntend'
import ToDo from './components/ToDo'
import axios from 'axios'
import { baseURL } from '../utitls/constant'
import { use } from 'react'
import Popup from './components/popup'
const App = () => {

  const [toDos, setToDos] = useState([])
  const [input, setInput] = useState("")
  const [updateUI, setUpdateUI] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupContent, setPopupContent] = useState({})

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then(res => setToDos(res.data))
      .catch((err) => console.log(err))
      ;
  }, [updateUI])

  const saveToDo = () => {
    axios.post(`${baseURL}/save`, { toDo: input })
      .then(res => {
        console.log(res.data)
        setUpdateUI((prevState) => !prevState)

        setInput("")
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <TodoFrntend input={input} setInput={setInput} saveToDo={saveToDo} />
      {/* <ToDo toDos={toDos} /> */}
      {/* {toDos.map(el => <ToDo key = { el._id }text={el .toDo} />)} */}
      {toDos.map(el => (
        <ToDo key={el._id} text={el.toDo} id={el._id} setUpdateUI={setUpdateUI} setShowPopup={setShowPopup} setPopupContent={setPopupContent }/>
      ))}
      {showPopup && <Popup setShowPopup={setShowPopup} popupContent={popupContent}  setUpdateUI={setUpdateUI}/>}
    </div>
  )
}

export default App
