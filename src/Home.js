import React, {createContext} from "react"
import { Link } from "react-router-dom"

export default function Home(props) {
    const [questions, setQuestions] = React.useState()
    const [selectChange, setSelectChange] = React.useState(0)

    function makeUrl() {
        let url = "https://opentdb.com/api.php?amount=5"
        if (document.getElementById("categories").value != "any") {
            url += `&category=${document.getElementById("categories").value}`
        }
        if (document.getElementById("difficulty").value != "any") {
            url += `&difficulty=${document.getElementById("difficulty").value}`
        }
        url += `&type=${document.getElementById("type").value}`
        return url
    }

    React.useEffect(function() {
        const url = makeUrl()
        fetch(url)
            .then(res => res.json())
            .then(data => setQuestions(data))
    }, [selectChange])

    function fetchQuestions() {
        setSelectChange(prevValue => prevValue + 1)
    }

    return (
        <main className="homepage">
            <section className="homepage-section">
                <h1>Quizzical</h1>
                <div className="homepage-select">
                    <label htmlFor="categories">Select a category: </label>
                    <select id="categories" onChange={fetchQuestions}>
                        <option value="any">Any Category</option>
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment: Books</option>
                        <option value="11">Entertainment: Film</option>
                        <option value="12">Entertainment: Music</option>
                        <option value="13">Entertainment: Musicals &amp; Theatres</option>
                        <option value="14">Entertainment: Television</option>
                        <option value="15">Entertainment: Video Games</option>
                        <option value="16">Entertainment: Board Games</option>
                        <option value="17">Science &amp; Nature</option>
                        <option value="18">Science: Computers</option>
                        <option value="19">Science: Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment: Comics</option>
                        <option value="30">Science: Gadgets</option>
                        <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
                        <option value="32">Entertainment: Cartoon &amp; Animations</option>		
                    </select>
                </div>
                <div className="homepage-select">
                    <label htmlFor="difficulty">Select difficulty: </label>
                    <select id="difficulty" onChange={fetchQuestions}>
                        <option value="any" default>Any</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="homepage-select">
                    <label htmlFor="type">Select questions type: </label>
                    <select id="type" onChange={fetchQuestions}>
                        <option value="multiple" default>Multiple choice</option>
                        <option value="boolean">True/false</option>
                    </select>
                </div>
                <Link to="/quiz"><button onClick={() => props.storeQuestions(questions)}>Start quiz</button></Link>
            </section>
        </main>
    )
}
