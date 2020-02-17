import React, { Component } from 'react';
import Navbar from './components/navbar';
import Brand from './components/brand';
import Transport from './components/transport';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';

import './App.css';

class App extends Component {
    render(){
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Switch>
                        <Route exact path="/Brand" component={Brand}/>
                        <Route exact path="/Transport" component={Transport}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
