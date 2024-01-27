import React,{ useCallback, useContext, useState } from "react";
import analyticsStyle from "./Analytics.module.css";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdShare } from "react-icons/io";
import moment from "moment";
import axios from "axios";
import { API } from "../../Services/Api";
import { Link } from "react-router-dom";
import { QuizContext } from "../CreateQuiz/QuizContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Quizes = ({ quiz, index, fetchDataAndUpdate,popup }) => {
  const formattedDate = moment(quiz.createdAt).format("DD MMM, YYYY");
  const [deleteModal, setDeleteModal] = useState(false);
  const { setDashboardState, setAnalysisQuizId } =
    useContext(QuizContext);

  const [quizId, setQuizId] = useState(null);
  const [type, setType] = useState("");

  const handleDeleteQuiz = useCallback((quizId, type) => {
    setQuizId(quizId);
    setType(type);
    setDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      await axios.post(
        `${API}/delete-quiz`,
        {
          quizId: quizId,
          quizType: type,
        },
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );
      setDeleteModal(false);
      fetchDataAndUpdate();
    } catch (error) {
      console.log(error);
    }
  }, [quizId, type]);
  
  const handleLinkCopy = (quizId) => {
    let link;
    link = `http://localhost:5173/quiz/${quizId}`;
    
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast("Link copied to Clipboard");
      })
      .catch((error) => {
        console.error("Unable to copy text to clipboard", error);
      });
  };

  return (
    <>
      <div className={analyticsStyle.quiz_details}>
        <h2>{index + 1}</h2>
        <h2>{quiz.quizTitle}</h2>
        <h2>{formattedDate}</h2>
        <h2>{quiz.impression}</h2>
        <div className={analyticsStyle.analysis_btns}>
        <h2 className={analyticsStyle.quiz_edit}>
          <TbEdit size={"1.5vw"} onClick={()=>{setAnalysisQuizId(quiz._id),popup(true)}}/>
        </h2>
        <h2
          className={analyticsStyle.delete_quiz}
          onClick={() => handleDeleteQuiz(quiz._id, quiz.quizType)}
        >
          <RiDeleteBin6Fill size={"1.5vw"}/>
        </h2>
        <h2
          className={analyticsStyle.share_quiz}
          onClick={() => handleLinkCopy(quiz._id)}
        >
          <IoMdShare size={"1.5vw"}/>
        </h2>
        </div>
       
        <Link className={analyticsStyle.analysis_link}
          onClick={() => {
            setDashboardState("quizAnalysis"), setAnalysisQuizId(quiz._id);
          }}
        >
          Question Wise Analysis
        </Link>

      </div>
      {deleteModal && (
        <>
          <div className={analyticsStyle.modal_wraper}></div>
          <div className={analyticsStyle.delete_container}>
            <h1>Are you confirm you want to delete ?</h1>
            <div className={analyticsStyle.delete_btn}>
              <button onClick={handleConfirmDelete}>Confirm Delete</button>
              <button onClick={() => setDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </>
      )}

    </>
  );
};

export default Quizes;
