import "./App.css";
import Home from "./Home";
import Content from "./Content"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Order from "./Order";
import Place from "./Place"
import User from "./User";
import Admin from "./Admin";
// import PlacesFun from "./PlacesFun";

function App() {
  return (
    <Router>
      <div className="App">
  
        <div className="path">
          <Switch>
            <Route exact path="/">
              <Home />
              <Content/>
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/order">
              <Order />
            </Route>
            <Route path="/place">
              <Place/>
            </Route>
            <Route path="/user">
              <User/>
            </Route>
            <Route path="/admin">
              <Admin/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
