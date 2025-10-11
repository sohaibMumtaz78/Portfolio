import axios from 'axios';
import React, { useState } from 'react'
// import { ImCross } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { baseURL } from '../../utitls/constant';



const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
    const [input, setInput] = useState(popupContent?.text || "")

    const updateToDo = () => {
        axios
            .put(`${baseURL}/update/${popupContent.id}`, { toDo: input })
            .then((res) =>{
                console.log(res.data)
                setUpdateUI((prevState) => !prevState)
                setShowPopup(false)
            })
};
return (
    <div className='backdrop'>
        <div className="popup">
            <ImCross className='icon' onClick={() => {
                setShowPopup(false)
            }} />
            <h1>Updated Todo</h1>

            <div className="popup_input_holder">
                <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Update a ToDo ' />
                <button onClick={updateToDo}>Update</button>
            </div>
        </div>
    </div>
)
}

export default Popup
