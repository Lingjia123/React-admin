import React,{Component} from 'react';

import {BrowserRouter as Router, Switch, Route,Redirect} from 'react-router-dom';

import Login from './pages/login/login';
import Admin from './pages/admin/admin';

import './assets/less/reset.less';

export default class App extends Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' component={Admin}/>
                    <Redirect to='/login'/>
                </Switch>
            </Router>
        )

    }
}
