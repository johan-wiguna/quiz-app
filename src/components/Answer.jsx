import React from "react"

export default function Answer(props) {
    return (
        <div className={`answer ${props.isSelected ? "answer-selected" : ""}`}
            value={props.data} data-question-index={props.questionIndex}
            data-is-correct={props.isCorrect} onClick={e => props.selectAnswer(e)}
        >
            {props.data}
        </div>
    )
}