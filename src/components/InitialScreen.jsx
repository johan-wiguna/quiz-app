import React from "react"

export default function Initial(props) {
    return (
        <div className="initial">
            <h1>Quizzz</h1>
            <button onClick={props.startGame}>Start quiz</button>
        </div>
    )
}