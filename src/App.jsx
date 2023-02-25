import { useState, useEffect } from 'react'
import './App.css'
import InitialScreen from './components/InitialScreen.jsx'
import Question from './components/Question.jsx'

export default function App() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [questionData, setQuestionData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple&category=15")
            .then(response => response.json())
            .then(data => setQuestionData(data.results))
    }, [])

    console.log(questionData)

    const questionElements = questionData.map(q => (
        <Question
            key={generateId(20)}
            category={q.category}
            question={q.question}
            correctAnswer={q.correct_answer}
            incorrectAnswers={q.incorrect_answers}
        />
    ))

    function startGame() {
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
        // fetch("https://opentdb.com/api.php?amount=5&type=multiple&category=15")
        //     .then(response => response.json())
        //     .then(data => setQuestionData(data.results))
    }

    function generateId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }

        return result;
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