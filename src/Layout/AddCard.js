import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function AddCard(){
const [deck, setDeck] = useState({})
const [front, setFront] = useState("");
const [back, setBack] = useState("");
const history=useHistory();
const {deckId} = useParams();

    const handleFrontChange = (event) => {
        setFront(event.target.value)
    }

    const handleBackChange = (event) => {
        setBack(event.target.value)
    }

    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId)
             setDeck(response)
             console.log(response)
        }
        loadDeck()
    }, [])

    const submitHandler = async (event) =>{
        event.preventDefault()
        const response = await createCard(deckId, {front, back});
        console.log(response)
        await readDeck(response.deckId)
        history.go(0)
    }



    function buttonHandler(event) {
        event.preventDefault();
        history.push(`/decks/${deck.id}`)
    }


return (
    <div>
        <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item">
                     <Link to="/">
                     <FontAwesomeIcon icon={faHome}/>
                    Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                 <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
         </nav>
        <form>
            <div >
                <h2>{deck.name}: Add Card</h2>
                <div className="mb-3">
                <label htmlFor="front" className="form-label">Front</label>
                <textarea
                className="form-control"
                id="front"
                type="text"
                name="front"
                placeholder="Front side of card"
                onChange={handleFrontChange}
                value={front}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="back" className="form-label">Back</label>
                <textarea
                className="form-control"
                id="back"
                type="text"
                name="back"
                placeholder="Back side of card"
                onChange={handleBackChange}
                value={back}
                />
                </div>
            </div>
            <div className="mt-2">
            <button className="btn btn-secondary text-white" onClick={buttonHandler}>Done</button>
            <button type="submit" className="btn btn-primary ml-2" onClick={submitHandler}>Save</button>
            </div>
        </form>
    </div>
)

}
export default AddCard;