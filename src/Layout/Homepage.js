import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";
import { faPlus, faEye, faBook, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Homepage(){
const [decks, setDecks] = useState([]);
const history = useHistory();


useEffect(() => {
    async function getDeck() {
      const response = await listDecks()
      setDecks(response);
    }
    getDeck();
  }, []);




  
  function deleteButtonHandler(deckId) {
    if (
      window.confirm(
        "Delete this deck? You will not be able to recover it."
      )
    ) {
      deleteDeck(deckId)
      .then(history.go(0));
    }
  }

  //react key warning

  return (
    <div>
        <div>           
        <Link to="/decks/new" className="btn btn-secondary text-white">
            <FontAwesomeIcon icon={faPlus} /> 
            {" "}Create Deck
        </Link>
        </div>
        <div>
            {decks?.map((deck)=>
            <div className="d-grid gap-2 d-md-block mt-2 mb-4" key={deck}> 
            <div className="card w-75">
              <div className="card-header bg-light">
              <h5 className="float-left">{deck.name}</h5>
              <p className="float-right">{deck.cards.length} cards</p>
              </div>
                    <div className="card-body">
                        <p className="card-text">{deck.description}</p>
                    </div>
                <div className="ml-2 mr-2 mb-3">
                <Link to ={`/decks/${deck.id}`} className="btn btn-secondary float-left mr-2">
                <FontAwesomeIcon icon={faEye} />
                {" "}View
                </Link>                
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary float-left">
                <FontAwesomeIcon icon={faBook}/> 
                {" "}Study
                </Link>
            
                <button className="btn btn-danger float-right" onClick={() => deleteButtonHandler(deck.id)}>
                <FontAwesomeIcon icon={faTrash}/>
                </button>
                </div>

            </div>  
        </div>   
            )}  
        </div>
    </div>
  )
}


export default Homepage;


