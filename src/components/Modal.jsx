import React from 'react'
import imgAnswer from '../assets/modal-answer.png'
import imgSad from '../assets/sad.png'
import imgSmile from '../assets/smile.png'
import imgBigSmile from '../assets/big-smile.png'

export default function Modal(props) {
    let totalCorrectAnswers = 0
    let totalQuestions = 0
    let totalIncorrectAnswers = 0
    let rating = 0

    if (props.type == "score") {
        totalCorrectAnswers = props.data.totalCorrectAnswers
        totalQuestions = props.data.totalQuestions
        totalIncorrectAnswers = totalQuestions - totalCorrectAnswers

        if (totalCorrectAnswers <= Math.floor(totalQuestions / 2)) {
            rating = 1
        } else if (totalCorrectAnswers > Math.floor(totalQuestions / 2) && totalCorrectAnswers != totalQuestions) {
            rating = 2
        } else if (totalCorrectAnswers == totalQuestions) {
            rating = 3
        }
    }

    return (
        <div className="Modal">
            {(props.type == "answer-incomplete") &&
                <div className="modal-content" id="modal-content">
                    <button className="close" onClick={props.closeModal}>✖</button>
                    <img className="img-answer-incomplete" src={imgAnswer} alt="modal-img" />
                    <p>Please answer all of the questions before checking your answers.</p>
                    <button className="btn-primary btn-modal accept" onClick={props.closeModal}>OK</button>
                </div>
            }

            {(props.type == "score") &&
                <div className="modal-content" id="modal-content">
                    <button className="close" onClick={props.previewAnswers}>✖</button>
                    
                    {rating == 1 && <img className="img-emoji" src={imgSad} alt="modal-img" />}
                    {rating == 2 && <img className="img-emoji" src={imgSmile} alt="modal-img" />}
                    {rating == 3 && <img className="img-emoji" src={imgBigSmile} alt="modal-img" />}

                    {rating == 1 && <p>You got <b>{totalCorrectAnswers}</b> out of <b>{totalQuestions}</b> questions correct. You can do better next time, cheers! &#127867;</p>}
                    {rating == 2 && <p>You got <b>{totalCorrectAnswers}</b> out of <b>{totalQuestions}</b> questions correct.</p>}
                    {rating == 3 && <p><b>Congratulations!</b><br />You answered all of the questions correctly.</p>}

                    <button className="btn-primary btn-modal-wide accept" onClick={props.previewAnswers}>{totalIncorrectAnswers > 1 ? "View my mistakes" : "View my mistake"}</button>
                    <button className="btn-primary btn-modal-wide accept mt-8" onClick={props.backToMenu}>Back to menu</button>
                </div>
            }
        </div>
    )
}