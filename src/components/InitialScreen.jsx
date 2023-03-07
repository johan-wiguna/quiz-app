import React from "react"

export default function Initial(props) {
    return (
        <div className="Initial">
            <div className="logo">treevee</div>
            <button className="btn-start" onClick={props.startGame}>Start quiz</button>
        </div>
    )
}