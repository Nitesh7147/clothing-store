import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage";
import { Switch, Route } from "react-router-dom";
import ShopPage from "./pages/shop/shop";
import Header from "./components/header/header";
import SignInSignUpPage from "./components/sign-in-and-sign-up/sign-in-and-sign-up";

import { auth, createUserProfileDocument } from "./firebase/firebase-util";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({currentUser: user});
      if (userAuth) {
        //storing userRef of createUser() in userRef of App.js
        const userRef = await createUserProfileDocument(userAuth);
        //sends us snapshot of data in database when the app runs
        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot.data())
          // id of document can be accessed using, snapshot.id
          // all other data can be accessed using, snapShot.data()
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            }
          });
          
        });
      }
      //if user is null or if user signs out
      else {
      // since here, userAuth is null
      this.setState({currentUser: userAuth});
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* by placing header outside of switch,it is always available
      across all pages */}
        {/* make header aware of user state */}
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
