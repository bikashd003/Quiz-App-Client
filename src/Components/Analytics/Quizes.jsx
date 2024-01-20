import React from 'react'
import analyticsStyle from "./Analytics.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
const Quizes = () => {
  return (
    <>
    <div className={analyticsStyle.quiz_details}>
    <h2>1</h2>
    <h2>Quiz 1</h2>
    <h2>01 Sep, 2023</h2>
    <h2>455</h2>
    <h2 className={analyticsStyle.quiz_edit}><TbEdit /></h2>
    <h2 className={analyticsStyle.delete_quiz}><RiDeleteBin6Fill /></h2>
    <h2 className={analyticsStyle.share_quiz}><IoMdShare /></h2>
    <h3>Question Wise Analysis</h3>
    </div>
    </>
  )
}

export default Quizes