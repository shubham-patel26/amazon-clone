import React ,{ useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Login from './Login';
import Payment from './Payment';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const [{}, dispatch ] = useStateValue();

  useEffect(() =>{

    auth.onAuthStateChanged(authUser => {
      console.log(authUser);

      if(authUser){
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the user if logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })

    
  },[]);

  return (
    <Router>
      <div className="app">
      
        <Switch>
          <Route path="/login"> 
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path='/payment'> 
            <Payment/>
          </Route>
          
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
        
        
      
      </div>
    </Router>
    
  );
}

export default App;
