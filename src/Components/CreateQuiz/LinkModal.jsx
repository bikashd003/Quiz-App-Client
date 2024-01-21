import React from 'react'
import createQuiz from "./CreateQuiz.module.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
const LinkModal = ({closeModal}) => {
  return (
   <>
   <div className={createQuiz.link_modal}>
    <button className={createQuiz.close_link} onClick={closeModal }><AiOutlineClose/></button>
    <h1>Congrats your Quiz is Published!</h1>
    <input type="text"/>
    <button className={createQuiz.share_link}>Share</button>
   </div>
   </>
  )
}

export default LinkModal