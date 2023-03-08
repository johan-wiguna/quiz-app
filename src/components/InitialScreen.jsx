import React from "react"

export default function Initial(props) {
    return (
        <div>
            <div className="Initial">
                <div className="logo">treevee</div>
                <div className="tagline">A workout for your brain</div>
                <button className="btn-start" onClick={props.startGame}>Start quiz</button>
            </div>
            <div className="footer">Created by <b>Johan Adi Wiguna</b></div>
        </div>
    )
}