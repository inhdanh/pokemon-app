import './App.css';
import React from 'react'
import Home from './components/home';
import MenuBar from './components/menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ListPokemon from './components/listPokemon';
import Footer from './components/footer';
import Header from './components/header';

function App() {
  
  return (
    <Router>
    <div className="app">
      <Header />
      <MenuBar />
      <div className="main">
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/list'>
            <ListPokemon/>
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;
