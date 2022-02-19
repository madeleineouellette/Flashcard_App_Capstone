import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import { createDeck, readDeck } from "../utils/api/index";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function CreateDeck(){
const history=useHistory();
const [name, setName] = useState("");
const [description, setDescription] = useState("");

const handleNameChange = (event) => {
    setName(event.target.value)
}

const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
}

const submitHandler= async (event) =>{
    event.preventDefault()
    const response = await createDeck({name, description});
    await readDeck(response.deckId)
    history.push(`/decks/${response.id}`)
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
                 <li className="breadcrumb-item">Create Deck</li>
            </ol>
         </nav>
        <form onSubmit={submitHandler}>
            <div >
                <h2>Create Deck</h2>
                <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                className="form-control"
                id="name"
                type="text"
                name="name"
                placeholder="Deck Name"
                onChange={handleNameChange}
                value={name}
                />
                </div>
                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                className="form-control"
                id="description"
                type="text"
                name="description"
                placeholder="Brief description of the deck"
                onChange={handleDescriptionChange}
                value={description}
                />
                </div>
            </div>
            <div className="mt-2">
            <Link to="/" className="btn btn-secondary text-white">Cancel</Link>
            <button type="submit" className="btn btn-primary ml-2">Submit</button>
            </div>
        </form>
    </div>
)

}

export default CreateDeck;