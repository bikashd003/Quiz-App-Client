import React from 'react'
import analyticsStyle from "./Analytics.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import moment from "moment";
import DeleteQuiz from './DeleteQuiz';

const Quizes = ({quiz,index,deleteModal,setDeleteModal}) => {
  const formattedDate = moment(quiz.createdAt).format("DD MMM, YYYY");
  return (
    <>
    <div className={analyticsStyle.quiz_details}>
    <h2>{index+1}</h2>
    <h2>{quiz.quizTitle}</h2>
    <h2>{formattedDate}</h2>
    <h2>455</h2>
    <h2 className={analyticsStyle.quiz_edit}><TbEdit /></h2>
    <h2 className={analyticsStyle.delete_quiz} onClick={()=>setDeleteModal(true)}><RiDeleteBin6Fill /></h2>
    <h2 className={analyticsStyle.share_quiz}><IoMdShare /></h2>
    <h3>Question Wise Analysis</h3>

    </div>
    {deleteModal && (<DeleteQuiz />)}
    </>
  )
}

export default Quizes