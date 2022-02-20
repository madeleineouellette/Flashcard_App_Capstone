import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardForm from "./CardForm";



function AddCard(){
const [deck, setDeck] = useState({})
const [card, setCard] = useState({ 
    front: "Front side of card", 
    back: "Back side of card" });
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
    }, [deckId])

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
         <h2>{deck.name}: Add Card</h2>
        <CardForm 
        submitButtonHandler={submitHandler}
        cancelButtonHandler={buttonHandler}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        card={card}
        deckId={deckId}
        />
    </div>
)
}


export default AddCard;

