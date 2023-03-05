import React from "react"

export default function LoadingScreen(props) {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <div className="loader-message"><b>{props.messageHeader}</b><br/>{props.messageContent}</div>
        </div>
    )
}