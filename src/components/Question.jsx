import { useState, useEffect } from 'react'
import Answer from "./Answer"

export default function Question(props) {
    const [answers, setAnswers] = useState(initializeAnswers)

    function initializeAnswers() {
        const allAnswers = []
        let answerArr = props.incorrectAnswers
        if (!answerArr.includes(props.correctAnswer)) {
            answerArr.push(props.correctAnswer)
        }
        shuffle(answerArr)

        for (let i = 0; i < answerArr.length; i++) {
            allAnswers.push({
                data: answerArr[i],
                isSelected: false
            })
        }

        return allAnswers
    }

    // useEffect(() => {
    //     let answerArr = props.incorrectAnswers
    //     if (!answerArr.includes(props.correctAnswer)) {
    //         answerArr.push(props.correctAnswer)
    //     }
    //     shuffle(answerArr)

    //     setAnswers(answerArr.map(answer => {
    //         return {data: answer, isSelected: false}
    //     }))
    // }, [])

    // console.log("answers", answers)

    const answerElement = answers.map(answer => {
        return (
            <Answer
                key={Math.random()}
                data={decode(answer.data)}
                isSelected={answer.isSelected}
                selectAnswer={selectAnswer}
            />
        )
    })

    function selectAnswer(e) {
        let selectedValue = e.target.getAttribute("value")
        console.log("sel", selectedValue)
        setAnswers(prevAnswers => prevAnswers.map(prevAnswer => {
            return {
                ...prevAnswer,
                isSelected: (selectedValue == decode(prevAnswer.data) ? !prevAnswer.isSelected : false)
            }
        }))
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
        
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function decode(str) {
        let txt = new DOMParser().parseFromString(str, "text/html");
        return txt.documentElement.textContent;
    }

    return (
        <div className="question-container">
            <div className="question">{decode(props.question)}</div>
            <div className="choices">
                {answerElement}
            </div>
        </div>
    )
}