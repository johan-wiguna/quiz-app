import { useState, useEffect } from 'react'
import './App.css'
import InitialScreen from './components/InitialScreen.jsx'
import Question from './components/Question.jsx'

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [questionData, setQuestionData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(response => response.json())
            .then(data => setQuestionData(data.results))
    }, [])

    const questionElements = questionData.map(q => (
            <Question
                category={q.category}
                question={q.question}
            />
    ))

    function startGame() {
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
        console.log("game begin")
    }

    return (
        <div className="App">
            {!isPlaying ? 
                <InitialScreen
                    startGame={startGame}
                />
                :
                questionElements
            }
        </div>
    )
}