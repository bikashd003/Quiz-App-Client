import React from "react";
import createQuiz from "./CreateQuiz.module.css";
import { RiDeleteBin6Fill } from "react-icons/ri";

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
            type="radio"
            name={`${index}`}
            onClick={() => handleQuestionType(index, "text")}
          />
          Text
        </h3>
        <h3>
          <input
            type="radio"
            name={`${index}`}
            onClick={() => handleQuestionType(index, "image")}
          />
          Image URL
        </h3>
        <h3>
          <input
            type="radio"
            name={`${index}`}
            onClick={() => handleQuestionType(index, "textAndImage")}
          />
          Text & Image URL
        </h3>
      </div>
      <div className={createQuiz.question_wraper}>
        <div className={createQuiz.options}>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className={createQuiz.option_item}>
              <input
                type="radio"
                name={`correctOption-${index}`}
                checked={question.correctOption === optionIndex}
                onChange={() => handleCorrectOptionChange(index, optionIndex)}
              />
              <input
                type="text"
                placeholder={`Text`}
                value={option.text}
                onChange={(e) =>
                  handleOptionChange(index, optionIndex, "text", e.target.value)
                }
              />
              {question.type === "textAndImage" && (
                <input
                  type="text"
                  placeholder={`Image URL`}
                  value={option.imageURL}
                  onChange={(e) =>
                    handleOptionChange(
                      index, optionIndex, "text&image",e.target.value)
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

        <div className={createQuiz.timer_container}>
          <h1>Timer</h1>
          <h2
            className={`${question.timer === "5sec" ? createQuiz.selected : ""}`}
            onClick={() => handleTimerChange(index, "5sec")}
          >
            5sec
          </h2>
          <h2
            className={`${question.timer === "10sec" ? createQuiz.selected : ""}`}
            onClick={() => handleTimerChange(index, "10sec")}
          >
            10sec
          </h2>
          <h2
            className={`${question.timer === "off" ? createQuiz.selected : ""}`}
            onClick={() => handleTimerChange(index, "off")}
          >
            Off
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Question;
