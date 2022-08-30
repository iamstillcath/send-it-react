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

function App() {
  return (
    <Router>
      <div className="App">
  
        <div className="path">
          <Switch>
            <Route exact path="/home">
              <Home />
              <Content/>
            </Route>
            <Route exact path="/">
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
