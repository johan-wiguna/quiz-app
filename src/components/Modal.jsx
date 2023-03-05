import React from 'react'
import imgAnswer from '../assets/modal-answer.png'

export default function Modal(props) {
    const correctAnswers = props.data.correctAnswers
    const totalQuestions = props.data.totalQuestions

    let rating = -1
    if (correctAnswers <= Math.floor(totalQuestions / 2)) {
        rating = 1
    } else if (correctAnswers > Math.floor(totalQuestions / 2) && correctAnswers != totalQuestions) {
        rating = 2
    } else if (correctAnswers == totalQuestions) {
        rating = 3
    }

    console.log(rating)

    return (
        <div className="Modal">
            {(props.type == "answer-incomplete") &&
                <div className="modal-content" id="modal-content">
                    <button className="close" onClick={props.closeModal}>✖</button>
                    <img src={imgAnswer} alt="modal-img" />
                    <p>Please answer all of the questions before checking your answers.</p>
                    <button className="btn-primary btn-modal accept" onClick={props.closeModal}>OK</button>
                </div>
            }

            {(props.type == "score") &&
                <div className="modal-content" id="modal-content">
                    <button className="close" onClick={props.closeModal}>✖</button>
                    <img src={imgAnswer} alt="modal-img" />

                    {rating == 1 && <p>You got <b>{correctAnswers}</b> out of <b>{totalQuestions}</b> questions correct. You can do better next time, cheers! &#127867;</p>}
                    {rating == 2 && <p>You got <b>{correctAnswers}</b> out of <b>{totalQuestions}</b> questions correct.</p>}
                    {rating == 3 && <p><b>Congratulations!</b><br />You answered all of the questions correctly.</p>}

                    <button className="btn-primary btn-modal-wide accept" onClick={props.previewAnswers}>View my mistakes</button>
                    <button className="btn-primary btn-modal-wide accept mt-8" onClick={props.backToMenu}>Back to menu</button>
                </div>
            }
        </div>
    )
}