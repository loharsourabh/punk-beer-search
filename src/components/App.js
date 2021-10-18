import './App.css';
import Header from './Header.js';
import Beer from './Beer.js';
import BeerList from './BeerList.js';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import React from 'react';

function App() {

    return (
        <div className='App'>
            <BrowserRouter>
                <h1 className='App_heading'>Browse Punk Beer's catalogue</h1>
                <Header/>
                <Switch>
                    <Route path='/beer/:name'>
                        <Beer/>  
                    </Route>
                    <Route path='/page/:page(\d+)'>
                        <BeerList/>  
                    </Route>
                    <Route path='/'>
                        <BeerList/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;