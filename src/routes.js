import {BrowserRouter, Route,Switch} from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import SearchPage from './pages/SearchPage'
import History from './pages/History'
import Enterprise from './pages/Enterprise'
import Profile from './pages/Profile'
import React from 'react';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                 <Route path="/" exact component= {Dashboard} />
                 <Route path="/register" component= {Register} />
                 <Route path="/search" component= {SearchPage} />
                 <Route path="/history" component= {History} />
                 <Route path="/enterprise" component= {Enterprise} />
                 <Route path="/profile" component= {Profile} />
            </Switch>
        </BrowserRouter>
    )
}