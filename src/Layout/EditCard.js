import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function EditCard(){
const history = useHistory();
const [card, setCard] = useState({ front: "", back: "" });
const [deck, setDeck] = useState({})
const {deckId, cardId} = useParams();


const handleFrontChange = (event) => {
    setCard({...card, front: event.target.value})
}

const handleBackChange = (event) => {
    setCard({...card, back: event.target.value})
}


useEffect(() => {
    async function loadDeck(){
        const response = await readDeck(deckId)
        setDeck(response)
    }
    loadDeck()
}, [])

useEffect(() => {
    async function loadCard(){
        const response = await readCard(cardId)
         setCard(response)
    }
    loadCard()
}, []);

function cancelButtonHandler(event) {
    event.preventDefault();
    history.push(`/decks/${deck.id}`)
}

const submitButtonHandler = async (event) => {
    event.preventDefault()
    await updateCard(card)
    history.push(`/decks/${deck.id}`)
}


console.log(card.front)

return (
    <div>
        <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item">
                     <Link to="/">
                     <FontAwesomeIcon icon={faHome}/>
                    Home</Link>
                </li>
                 <li className="breadcrumb-item">Edit Card</li>
            </ol>
         </nav>
        <form onSubmit={submitButtonHandler}>
            <div >
                <h2>Edit Card</h2>
                <div className="mb-3">
                <label htmlFor="front" className="form-label">Front</label>
                <textarea
                className="form-control"
                id="front"
                type="text"
                name="front"
                placeholder={card.front}
                onChange={handleFrontChange}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="back" className="form-label">Back</label>
                <textarea
                className="form-control"
                id="back"
                type="text"
                name="back"
                placeholder={card.back}
                onChange={handleBackChange}
                />
                </div>
            </div>
            <div className="mt-2">
            <button className="btn btn-secondary text-white" onClick={cancelButtonHandler}>Cancel</button>
            <button type="submit" className="btn btn-primary ml-2">Submit</button>
            </div>
        </form>
    </div>
)
}

export default EditCard;