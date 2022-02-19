import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteCard, deleteDeck, readDeck } from "../utils/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBook, faTrash, faPencilAlt, faHome } from "@fortawesome/free-solid-svg-icons";



function Deck(){
    const [deck, setDeck] = useState({});
    const {deckId} = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId)
             setDeck(response)
        }
        loadDeck()
    }, []);


 function deleteDeckHandler(deckId) {
    if (
      window.confirm(
        "Delete this deck? You will not be able to recover it."
      )
    ) {
      deleteDeck(deckId)
      .then(history.go(0));
    }
  }

  function deleteCardHandler(cardId){
      if (
          window.confirm(
              "Delete this card? You will not be able to recover it."
          )
      ) {
          deleteCard(cardId)
          .then(history.go(0))
      }
  }


return (
    <div>
        <div>
        <nav aria-label="breadcrumb">
             <ol className="breadcrumb">
                 <li className="breadcrumb-item"> 
                     <Link to="/">                 
                     <FontAwesomeIcon icon={faHome}/>
                    Home
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    {deck.name}
                </li>
            </ol>
         </nav>
         </div>

         <div className="card">
             <div className="card-body">
             <h3 className="card-title">{deck.name}</h3>
             <p className="card-text">{deck.description}</p>
                   
            <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary ml-2 float-left">
            <FontAwesomeIcon icon={faPencilAlt} />
            {" "}Edit
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary ml-2 float-left">
                <FontAwesomeIcon icon={faBook}/> 
                {" "}Study
            </Link>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary ml-2 float-left">
            <FontAwesomeIcon icon={faPlus} />
            {" "}Add Cards
            </Link>
            <button className="btn btn-danger ml-2 float-right" onClick={() => deleteDeckHandler(deck.id)}>
                <FontAwesomeIcon icon={faTrash}/>
            </button> 
            </div>
         </div> 
            <h2>Cards</h2>
            {deck.cards?.map((card) => (
             <div className="card float-center d-grid gap-2 d-md-block mt-2 mb-4" style={{ width: '30rem' }} key={card}>
                <div className="container">
                   <div className="row pb-2 pt-2">
                       <div className="col">
                             {card.front}
                        </div>
                        <div className="col">
                             {card.back}
                    <div className="d-grid gap-2 float-right">
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-secondary text-white">
                         <FontAwesomeIcon icon={faPencilAlt} />
                        {" "}Edit
                         </Link>
                    <button className="btn btn-danger ml-2" onClick={() => deleteCardHandler(card.id)}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </button> 
                        </div>  
                        </div>
                     </div>
                </div>
            </div>
            )
            )}

    </div>

)
}

//need to separate each card into it's own card element
//edit button on cards needs to go to /decks/:deckId/cards/:cardId/edit 

export default Deck;


