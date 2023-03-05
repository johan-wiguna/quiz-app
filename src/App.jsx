import { useState, useEffect } from 'react'
import './App.css'
import InitialScreen from './components/InitialScreen.jsx'
import Question from './components/Question.jsx'
import Modal from './components/Modal.jsx'

export default function App() {
    const totalQuestions = 5
    const [isPlaying, setIsPlaying] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [questionElements, setQuestionElements] = useState([])
    const [answerStatus, setAnswerStatus] = useState(initializeAnswerStatus(totalQuestions))
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple&category=15`)
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
    }, [])

    function startGame() {
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
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
                console.log("ANSWER ALL QUESTIONS!")
                setShowModal(true)
                allQuestionAnswered = false;
                break;
            }
        }

        // Summarize correct answers if every question has been answered
        if (allQuestionAnswered) {
            let correctAnswers = 0
            for (let i = 0; i < answerStatus.length; i++) {
                const answerIsCorrect = answerStatus[i]
                if (answerIsCorrect) {
                    correctAnswers++
                }
            }
            console.log(correctAnswers)
        }
    }

    function closeModal() {
        setShowModal(false)
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
                    {showModal && <Modal closeModal={closeModal} />}
                    {questionElements}
                    <div className="question-end-container">
                        {isReady && <button className="btn-primary" onClick={() => checkFinalAnswers()}>Check Answers</button>}
                    </div>
                </div>
            }
        </div>
    )
}