import { useState, useEffect } from 'react'
import {Transition, CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group"
import './App.css'
import InitialScreen from './components/InitialScreen.jsx'
import Question from './components/Question.jsx'
import Modal from './components/Modal.jsx'
import LoadingScreen from './components/LoadingScreen.jsx'

export default function App() {
    const totalQuestions = 5
    const [isPlaying, setIsPlaying] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [questionElements, setQuestionElements] = useState([])
    const [answerStatus, setAnswerStatus] = useState(initializeAnswerStatus(totalQuestions))
    const [showModal, setShowModal] = useState({})
    const [hasFinished, setHasFinished] = useState(false)

    // useEffect(() => {
    //     fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple&category=15`)
    //         .then(response => response.json())
    //         .then(data => {
    //             const dataResults = data.results
    //             console.log(dataResults)

    //             let idx = 0
    //             setQuestionElements(dataResults.map(q => {
    //                 const id = generateId(16)
    //                 return (
    //                     <Question
    //                         key={id}
    //                         id={id}
    //                         index={idx++}
    //                         question={q.question}
    //                         correctAnswer={q.correct_answer}
    //                         incorrectAnswers={q.incorrect_answers}
    //                         changeAnswerStatus={changeAnswerStatus}
    //                     />
    //                 )
    //             }))

    //             setIsReady(true)
    //         })
    // }, [])

    function startGame() {
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
        fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple`)
            .then(response => response.json())
            .then(data => {
                const dataResults = data.results
                console.log(dataResults)

                let idx = 0
                setQuestionElements(dataResults.map(q => {
                    const id = generateId(16)
                    return (
                        <Question
                            key={id}
                            id={id}
                            index={idx++}
                            question={q.question}
                            correctAnswer={q.correct_answer}
                            incorrectAnswers={q.incorrect_answers}
                            changeAnswerStatus={changeAnswerStatus}
                        />
                    )
                }))

                setIsReady(true)
            })
    }

    function backToMenu() {
        setIsPlaying(false)
        setIsReady(false)
        setQuestionElements([])
        setShowModal({})
        setHasFinished(false)
    }

    function initializeAnswerStatus(totalQuestions) {
        let answerStatusArr = []

        for (let i = 0; i < totalQuestions; i++) {
            answerStatusArr.push(null)
        }

        return answerStatusArr
    }

    function changeAnswerStatus(questionIndex, answerIsCorrect) {
        setAnswerStatus(prevAnswerStatus => {
            let answerStatusArr = []

            for (let i = 0; i < prevAnswerStatus.length; i++) {
                if (i == questionIndex) {
                    answerStatusArr.push(answerIsCorrect)
                } else {
                    answerStatusArr.push(prevAnswerStatus[i])
                }
            }

            return answerStatusArr
        })
    }

    function checkFinalAnswers() {
        // Check if all of the questions are answered
        let allQuestionAnswered = true;
        for (let i = 0; i < answerStatus.length; i++) {
            const currAnswer = answerStatus[i]
            if (currAnswer == null) {
                setShowModal({isShown: true, type: 'answer-incomplete'})
                allQuestionAnswered = false;
                break;
            }
        }

        // Summarize correct answers if every question has been answered
        if (allQuestionAnswered) {
            let totalCorrectAnswers = 0
            for (let i = 0; i < answerStatus.length; i++) {
                const answerIsCorrect = answerStatus[i]
                if (answerIsCorrect) {
                    totalCorrectAnswers++
                }
            }

            setHasFinished(true)
            setShowModal({isShown: true, type: 'score', data: {totalCorrectAnswers: totalCorrectAnswers, totalQuestions: totalQuestions}})
        }
    }

    function previewAnswers() {
        let answerElements = document.getElementsByClassName("answer")
        for (let i = 0; i < answerElements.length; i++) {
            let currAnswer = answerElements[i]
            currAnswer.disabled = true
        }

        let correctAnswerElements = document.getElementsByClassName("answer-correct")
        for (let i = 0; i < correctAnswerElements.length; i++) {
            const currAnswer = correctAnswerElements[i]
            if (currAnswer.classList.contains("answer-selected")) {
                currAnswer.classList.remove("answer-selected")
            }
            currAnswer.classList.add("answer-correct-highlight")
        }

        let incorrectAnswerElements = document.getElementsByClassName("answer-incorrect")
        for (let i = 0; i < incorrectAnswerElements.length; i++) {
            const currAnswer = incorrectAnswerElements[i]
            if (currAnswer.classList.contains("answer-selected")) {
                currAnswer.classList.remove("answer-selected")
                currAnswer.classList.add("answer-incorrect-highlight")
                
            }
        }

        setShowModal(false)
    }

    function closeModal() {
        setShowModal({isShown: false})
    }

    function generateId(length) {
        let result = ''
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        let counter = 0
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength))
          counter += 1
        }

        return result
    }

    return (
        <div className="App">
            {!isPlaying ? 
                <InitialScreen
                    startGame={startGame}
                />
                :
                <div>
                    <CSSTransition in={showModal.isShown} timeout={300} classNames="modal-ctg" unmountOnExit>
                        <Modal type={showModal.type} data={showModal.data} closeModal={closeModal} previewAnswers={previewAnswers} backToMenu={backToMenu} />
                    </CSSTransition>

                    <CSSTransition in={isReady} timeout={300} classNames="modal-ctg" unmountOnExit>
                        <div>{questionElements}</div>
                    </CSSTransition>
                    <div className="question-end-container">
                        <CSSTransition in={isReady} timeout={300} classNames="modal-ctg" unmountOnExit>
                            <div>
                                <button className="btn-primary btn-red" onClick={() => backToMenu()}>Back to menu</button>
                                {!hasFinished && <button className="btn-primary btn-blue ml-8" onClick={() => checkFinalAnswers()}>Check answers</button>}
                            </div>
                        </CSSTransition>
                        
                        <CSSTransition in={!isReady} timeout={300} classNames="modal-ctg" unmountOnExit>
                            <LoadingScreen
                                messageHeader="Fetching data..."
                                messageContent="Please kindly wait &#128578;"
                            />
                        </CSSTransition>
                    </div>
                </div>
            }
        </div>
    )
}