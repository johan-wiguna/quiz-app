import React from "react"

export default function Initial(props) {
    return (
        <div className="initial-container">
            <h1>Quizzz</h1>
            <button className="btn-start" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}