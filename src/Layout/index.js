import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Homepage from "./Homepage.js";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import Study from "./Study";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";


function Layout() {
  return (
    <div className="Layout">
      <Header />
      <div className="container">
      <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study /> 
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
      </Switch>
      </div>
    </div>
  );
}

export default Layout;
