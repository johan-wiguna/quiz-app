import React from "react"

export default function Answer(props) {
    return (
        <div className={props.isSelected ? "answer answer-selected" : "answer"} onClick={props.selectAnswer}>
            {props.data}
        </div>
    )
}