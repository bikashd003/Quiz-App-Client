import React, { useEffect, useState } from "react";
import analyticsStyle from "./Analytics.module.css";
import Quizes from "./Quizes";
import { API } from "../../Services/Api";
import axios from "axios";
const Analytic = () => {
  const [allQuiz, setAllQuiz] = useState([]);
  const[deleteModal,setDeleteModal]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/view-quiz`, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        setAllQuiz(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className={analyticsStyle.analytics_container}>
        <h1>Quiz Analysis</h1>
        <div className={analyticsStyle.analysis_navaber}>
          <h2>S.No</h2>
          <h2>Quiz name</h2>
          <h2>Created On</h2>
          <h2>Impression</h2>
        </div>
        <div className={analyticsStyle.quiz_details_container}>
          {allQuiz.map((quiz, index) => (
            <Quizes key={index} quiz={quiz} index={index} deleteModal={deleteModal} setDeleteModal={setDeleteModal}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Analytic;
