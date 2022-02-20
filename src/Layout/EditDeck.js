import React, { useEffect, useState } from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api/index";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function EditDeck(){
    const history = useHistory();
    const [deck, setDeck] = useState({name: "", description: "" })
    const {deckId} = useParams();



    useEffect(() => {
        async function loadDeck(){
            const response = await readDeck(deckId)
             setDeck(response)
             console.log(response)
        }
        loadDeck()
    }, [deckId])

    
    const submitHandler= async (event) =>{
        event.preventDefault()
        await updateDeck(deck)
        history.push(`/decks/${deck.id}`)
    }



    const cancelButtonHandler = (event) => {
        event.preventDefault();
        history.push(`/decks/${deck.id}`)
    }

    const handleNameChange = (event) => {
        setDeck({...deck, name: event.target.value})
    }

    const handleDescriptionChange = (event) => {
        setDeck({...deck, description: event.target.value})
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
                 <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
         </nav>
         <form onSubmit={submitHandler}>
            <div >
                <h2>Edit Deck</h2>
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                className="form-control"
                id="name"
                type="text"
                name="name"
                value={deck.name}
                onChange={handleNameChange}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                className="form-control"
                id="description"
                type="text"
                name="description"
                value={deck.description}
                onChange={handleDescriptionChange}
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

export default EditDeck;