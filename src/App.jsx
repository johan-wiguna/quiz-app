import { useState, useEffect } from 'react'
import './App.css'
import InitialScreen from './components/InitialScreen.jsx'
import Question from './components/Question.jsx'

export default function App() {
    const totalQuestions = 5
    const [isPlaying, setIsPlaying] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [questionElements, setQuestionElements] = useState([])
    const [answerStatus, setAnswerStatus] = useState(initializeAnswerStatus(totalQuestions))

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
            answerStatusArr.push(false)
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

    console.log(answerStatus)

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
                    {questionElements}
                    {isReady && <button className="btn-primary">Check Answers</button>}
                </div>
            }
        </div>
    )
}