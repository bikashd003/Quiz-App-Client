import React, { useContext } from "react";
import createQuiz from "./CreateQuiz.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { QuizContext } from "./QuizContext";

const Question = ({
  question,
  index,
  handleQuestionText,
  handleOptionChange,
  handleQuestionType,
  handleAddOption,
  handleRemoveOption,
  handleCorrectOptionChange,
  handleTimerChange,
}) => {
  const { timer, optionType, quizType } = useContext(QuizContext);
  return (
    <div>
      <input
        className={createQuiz.question_input}
        type="text"
        placeholder="Poll Question"
        value={question.text}
        onChange={(e) => handleQuestionText(index, e.target.value)}
      />
      <div className={createQuiz.option_type}>
        <h2>Option Type</h2>
        <h3>
          <input
            className={createQuiz.option_checked}
            type="radio"
            name={`${index}`}
            onChange={() => handleQuestionType("text")}
            checked={optionType === "text"}
          />
          Text
        </h3>
        <h3>
          <input
            className={createQuiz.option_checked}
            type="radio"
            name={`${index}`}
            onChange={() => handleQuestionType("image")}
            checked={optionType === "image"}
          />
          Image URL
        </h3>
        <h3>
          <input
            className={createQuiz.option_checked}
            type="radio"
            name={`${index}`}
            onChange={() => handleQuestionType("textAndImage")}
            checked={optionType === "textAndImage"}
          />
          Text & Image URL
        </h3>
      </div>
      <div className={createQuiz.question_wraper}>
        <div className={createQuiz.options}>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className={createQuiz.option_item}>
              {quizType === "Q&A" && (
                <input
                  className={createQuiz.correct_option}
                  type="radio"
                  name={`correctOption-${index}`}
                  checked={question.correctOption === optionIndex}
                  onChange={() => handleCorrectOptionChange(index, optionIndex)}
                />
              )}
              <input
                type="text"
                className={`${
                  question.correctOption == optionIndex
                    ? createQuiz.correctOption
                    : ""
                }`}
                placeholder={`${
                  optionType === "text" || optionType === "textAndImage"
                    ? "Text"
                    : "Image URL"
                }`}
                value={
                  optionType === "text"
                    ? option.text || ""
                    : optionType === "image"
                    ? option.imageURL || ""
                    : optionType === "textAndImage"
                    ? option.text || ""
                    : ""
                }
                onChange={(e) =>
                  handleOptionChange(
                    index,
                    optionIndex,
                    optionType == "text"
                      ? "text"
                      : optionType == "image"
                      ? "imageURL"
                      : "text",
                    e.target.value
                  )
                }
              />
              {optionType === "textAndImage" && (
                <input
                  type="text"
                  className={`${
                    question.correctOption == optionIndex
                      ? createQuiz.correctOption
                      : ""
                  }`}
                  placeholder={`Image URL`}
                  value={option.imageURL || ""}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      optionIndex,
                      "imageURL",
                      e.target.value
                    )
                  }
                />
              )}
              {(optionIndex === 2 || optionIndex === 3) && (
                <button onClick={() => handleRemoveOption(index, optionIndex)}>
                  <span className={createQuiz.delete_option}>
                    <RiDeleteBin6Fill />
                  </span>
                </button>
              )}
            </div>
          ))}
          {question.options.length < 4 && (
            <button
              onClick={() => handleAddOption(index)}
              className={createQuiz.add_option}
            >
              Add Option
            </button>
          )}
        </div>

        {quizType === "Q&A" && (
          <div className={createQuiz.timer_container}>
            <h1>Timer</h1>
            <h2
              className={`${timer === 5 ? createQuiz.selected_timer : ""}`}
              onClick={() => handleTimerChange(5)}
            >
              5sec
            </h2>
            <h2
              className={`${timer === 10 ? createQuiz.selected_timer : ""}`}
              onClick={() => handleTimerChange(10)}
            >
              10sec
            </h2>
            <h2
              className={`${timer === 0 ? createQuiz.selected_timer : ""}`}
              onClick={() => handleTimerChange(0)}
            >
              Off
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
