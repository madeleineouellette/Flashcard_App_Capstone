import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import {readDeck} from "../utils/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHome } from "@fortawesome/free-solid-svg-icons";



function Study(){
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([])
    const history=useHistory()
    const {deckId} = useParams();
    const [cardIndexNumber, setCardIndexNumber] = useState(0)
    const [cardFrontSide, setCardFrontSide] = useState(true)
    const [cardsLength, setCardsLength] = useState(0)


    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId)
             setDeck(response)
             setCards(response.cards)
             setCardsLength(response.cards.length)
        }
        loadDeck()
    }, [])

     //   flip button
        const flipButtonHandler = (event) => {
            if (cardFrontSide === true){
                setCardFrontSide(false)
            } else {
                setCardFrontSide(true)
            }
        }


        //next button
        const nextButtonHandler = (event) => {
            setCardIndexNumber(cardIndexNumber + 1)
            console.log(cardsLength, cardIndexNumber)
            if (cardIndexNumber === cardsLength - 1){
                if (
                    window.confirm("Restart cards? Click 'cancel' to return to the home page.")
                    ) {
                        setCardIndexNumber(0);
                        setCardFrontSide(true)
                    } else {
                        history.push("/")
                    }
            } 
            else {
                setCardIndexNumber(cardIndexNumber + 1);
                setCardFrontSide(true)
            }
        }


        if (cardsLength <= 2){
            return (
                <div>
                    <nav aria-label="breadcrumb">
                 <ol className="breadcrumb">
                     <li className="breadcrumb-item">
                    <Link>
                     <FontAwesomeIcon icon={faHome}/>
                        Home
                     </Link>                </li>
                     <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                     <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>    
            </nav>
                    <h1>{deck.name}: Study</h1>
                    <h3>Not enough cards.</h3>
                    <p>You need at least 3 cards to study. There are {cardsLength} cards in this deck.</p>
                    <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary ml-2 float-left">
                <FontAwesomeIcon icon={faPlus} />
                {" "}Add Cards
                </Link>
                </div>
            )
        }


    //need 'next' button handler
    //'next' button: if card === back, show next button and when clicked, continue to next card

    //need 'flip' button handler
    //'flip' button: show flip button on both front and back, when clicked, if card === front, show back and vice versa

    //when card number = card count, there will be a restart prompt when 'next' button is clicked which will then
    //either bring us back to home page (if cancel is clicked) or back to start of deck if 'ok' is clicked


    return (
    <div>
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
               <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>    
      </nav>
      </div>
        <div>
            <h1>{deck.name}: Study</h1>
        </div>
        <div div className="card float-center d-grid gap-2 d-md-block mt-2 mb-4" style={{ width: '30rem' }}>
            <div className="card-body">
            <h2>Card {cardIndexNumber+1} of {cardsLength}</h2>

            <div>
                {cardFrontSide ? <p>{cards[cardIndexNumber]?.front}</p> : <p>{cards[cardIndexNumber]?.back}</p>}
            </div>

            <button className="btn btn-secondary" onClick={flipButtonHandler}>Flip</button>

           
                {cardFrontSide ? <p></p> : <button className="btn btn-primary" onClick={nextButtonHandler}>Next</button>}
           

            </div>
        </div>
    </div>
    )
}


//use conditional rendering to flip cards, ex. if card is "front", change to "back" onClick

export default Study;


