import React from "react"

export default function Answer(props) {
    return (
        <button className={`answer ${props.isSelected ? "answer-selected" : ""} ${props.isCorrect ? "answer-correct" : "answer-incorrect"}`}
            value={props.data} data-question-index={props.questionIndex}
            data-is-correct={props.isCorrect} onClick={e => props.selectAnswer(e)}
        >
            {props.data}
        </button>
    )
}