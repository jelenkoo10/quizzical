import React from "react"
import Home from "./Home"
import Questions from "./Questions"
import "./styles.css"
import { Routes, Route } from "react-router-dom"

export const QuestionsContext = React.createContext()

export default function App() {
    const [questions, setQuestions] = React.useState({})

    const storeQuestions = (passedQuestions) => {
        setQuestions(passedQuestions)
    }

    return (
        <QuestionsContext.Provider value={questions}>
            <Routes>
                <Route exact path="/" element={<Home storeQuestions={storeQuestions} />} />
                <Route path="/quiz" element={<Questions />} />
            </Routes>
        </QuestionsContext.Provider>
    )
}