import React from "react";


function CardForm({handleBackChange, handleFrontChange, submitButtonHandler, cancelButtonHandler, card}){

    return (
        <form onSubmit={submitButtonHandler}>
            <div >
                <div className="mb-3">
                <label htmlFor="front" className="form-label">Front</label>
                <textarea
                className="form-control"
                id="front"
                type="text"
                name="front"
                value={card.front}
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
                value={card.back}
                onChange={handleBackChange}
                />
                </div>
            </div>
            <div className="mt-2">
            <button className="btn btn-secondary text-white" onClick={cancelButtonHandler}>Cancel</button>
            <button type="submit" className="btn btn-primary ml-2">Save</button>
            </div>
        </form>
    )
}


export default CardForm;