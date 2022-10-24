import React from "react"
import { Link } from "react-router-dom"
import { QuestionsContext } from "./App"

export default function Questions() {
    let finishedQuiz = false
    const questions = React.useContext(QuestionsContext)
    let modifiedQuestions = questions.results.map(function(question) {
        return { ...question, answers: shuffle([...question.incorrect_answers, question.correct_answer])}
    })
    let clickedAnswers = [[], [], [], [], []]
    let correctAnswers = modifiedQuestions.map(question => question.correct_answer)
    let groupedAnswers = modifiedQuestions.map(question => question.answers)
    let messages = ["Better luck next time.", "You can do better!", "Not too bad.", "Solid!", "Almost perfect!", "Congrats!"]

    function shuffle(array) {
        return array.sort(() => Math.random() - 0.5)
    }

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function updateAnswers(answer, index) {
        for (let i = 0; i < groupedAnswers.length; i++) {
            if (groupedAnswers[i].includes(answer) && i == index) {
                clickedAnswers[index].pop()
            }
        }
        
    }

    function updateSelected(answer, index) {
        let allAnswers = document.querySelectorAll(".answer")
        let answersPerQuestion = allAnswers.length == 20 ? 4 : 2
        for (let i = 0; i < allAnswers.length; i++) {
            if (allAnswers[i].classList.contains("selected")) {
                allAnswers[i].classList.remove("selected")
            }
        }
        for (let j = 0; j < allAnswers.length; j++) {
            for (let k = 0; k < clickedAnswers.length; k++) {
                if (clickedAnswers[k].includes(decodeHtml(allAnswers[j].textContent)) && Math.floor(j/answersPerQuestion) == k) {
                    allAnswers[j].classList.add("selected")
                }
            }
        }
    }

    function answerClicked(answer, index) {
        if (!finishedQuiz) {
            updateAnswers(answer, index)
            clickedAnswers[index].push(answer)
            updateSelected(answer, index)
        }
    }

    /* tri grupe odgovora
        1) izabrani, a netačni
        2) izabrani, a tačni
        3) neizabrani, a tačni
    */

    function updateColors() {
        let allAnswers = document.querySelectorAll(".answer")
        let answersPerQuestion = allAnswers.length == 20 ? 4 : 2
        for (let i = 0; i < allAnswers.length; i++) {
            for (let j = 0; j < correctAnswers.length; j++) {
                if (allAnswers[i].classList.contains("selected") && Math.floor(i/answersPerQuestion) == j && allAnswers[i].textContent == correctAnswers[j] ) {
                    allAnswers[i].classList.add("selected-and-correct")
                }
                if (allAnswers[i].classList.contains("selected") && Math.floor(i/answersPerQuestion) == j && allAnswers[i].textContent != correctAnswers[j] ) {
                    allAnswers[i].classList.add("selected-and-incorrect")
                }
                if (!(allAnswers[i].classList.contains("selected")) && Math.floor(i/answersPerQuestion) == j && allAnswers[i].textContent == correctAnswers[j]) {
                    allAnswers[i].classList.add("not-selected-but-correct")
                }
            }
        }
    }

    function checkAnswers() {
        if (!finishedQuiz) {
            let score = 0
            for (let i = 0; i < clickedAnswers.length; i++) {
                if (correctAnswers[i] == clickedAnswers[i][0]) {
                    score++
                }
            }
            document.getElementById("score").textContent = messages[score] + " Your score is " + score + "."
            document.getElementById("not-visible").style.visibility = "visible"
            updateColors()
            finishedQuiz = true
        } else {
            document.getElementById("score").textContent = "You've already finished this quiz! Go back to homepage and try again."
        }
    }

    function resetQuiz() {
        finishedQuiz = false
    }

    return (
        <main className="questions-page">
            <Link to="/" className="link-back" onClick={resetQuiz}>Back to homepage</Link>
            {modifiedQuestions.map((questionNum) => 
                <div className="question">
                    <p className="question-text">{decodeHtml(questionNum.question)}</p>
                    {questionNum.answers.length > 2 ? 
                    <div className="all-answers">
                        <span className="answer" onClick={() => answerClicked(questionNum.answers[0], modifiedQuestions.indexOf(questionNum))}>
                            {decodeHtml(questionNum.answers[0])}
                        </span>
                        <span className="answer" onClick={() => answerClicked(questionNum.answers[1], modifiedQuestions.indexOf(questionNum))}>
                            {decodeHtml(questionNum.answers[1])}
                        </span>
                        <span className="answer" onClick={() => answerClicked(questionNum.answers[2], modifiedQuestions.indexOf(questionNum))}>
                            {decodeHtml(questionNum.answers[2])}
                        </span>
                        <span className="answer" onClick={() => answerClicked(questionNum.answers[3], modifiedQuestions.indexOf(questionNum))}>
                            {decodeHtml(questionNum.answers[3])}
                        </span> 
                    </div>
                    : <div className="all-answers"> 
                        <span className="answer" onClick={() => answerClicked("True", modifiedQuestions.indexOf(questionNum))}>
                            {questionNum.answers[0] == "True" ? questionNum.answers[0] : questionNum.answers[1]}
                        </span>
                        <span className="answer" onClick={() => answerClicked("False", modifiedQuestions.indexOf(questionNum))}>
                            {questionNum.answers[1] == "False" ? questionNum.answers[1] : questionNum.answers[0]}
                        </span>
                    </div>}
                </div>
            )}
            <button className="check-btn" onClick={checkAnswers}>Check answers</button>
            <p id="score"></p>
            <Link to="/" className="link-back" id="not-visible" onClick={resetQuiz}>Back to homepage</Link>
        </main>
    )
}