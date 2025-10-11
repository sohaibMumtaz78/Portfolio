import React from 'react'
import { MdEdit } from "react-icons/md";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { baseURL } from "../../utitls/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {

    const deleteToDo = () => {
        axios.delete(`${baseURL}/delete/${id}`).then(res => {
            console.log(res.data)
            // setUpdateUI((prevState) = !prevState)
            setUpdateUI(prevState => !prevState);
        })
    }


    const updateToDo = () => {
        setPopupContent((id ,text))
        setShowPopup(true)
    }

    return (
        <div>
            <div className="todo">
                {text}
                <div className='icons'>
                    <MdEdit className='icon' onClick={updateToDo} />
                    <ImCross className="icon" onClick={deleteToDo} />
                </div>
            </div>
        </div>
    )
}

export default ToDo
