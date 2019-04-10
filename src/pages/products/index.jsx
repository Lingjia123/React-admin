import React, {Component} from 'react';
import {Switch, Route,Redirect} from 'react-router-dom';

import Index from './index/index'
import saveUpdate from './save-update/save-update'
export default class Products extends Component {
  render () {
    return (
      <Switch>
        <Route path="/product/index" component={Index}/>
        <Route path="/product/save-update" component={saveUpdate}/>
       <Redirect to='/product/index'/>
      </Switch>
    )
  }
}

