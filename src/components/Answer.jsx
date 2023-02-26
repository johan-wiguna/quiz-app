import React from "react"

export default function Answer(props) {
    return (
        <div className={props.isSelected ? "answer answer-selected" : "answer"} value={props.data} onClick={e => props.selectAnswer(e)}>
            {props.data}
        </div>
    )
}