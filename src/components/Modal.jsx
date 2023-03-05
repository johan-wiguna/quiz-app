import React from 'react'
import imgAnswer from '../assets/modal-answer.png'

export default function Modal(props) {
    return (
        <div className="Modal">
            <div className="modal-content" id="cookiesPopup">
                <button className="close" onClick={props.closeModal}>✖</button>
                <img src={imgAnswer} alt="modal-img" />
                <p>Please answer all of the questions before checking your answers.</p>
                <button className="btn-primary btn-modal accept" onClick={props.closeModal}>OK</button>
            </div>
        </div>
    )
}