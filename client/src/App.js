import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LandingPage from './components/landingPage';
import Card from './components/card';
import Home from './components/home';
import Details from './components/datails';
import Form from './components/Formulario';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path = "/home" component = {Home}/>
          <Route exact path = "/card" component = {Card}/>
          <Route exact path = "/home/:id" component = {Details}/>
          <Route exact path='/pokemons' component={Form}/>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
