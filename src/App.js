import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import Login from './Pages/Login/Login/Login';
import Signup from './Pages/Login/Signup/Signup';
import AuthProvider from './Context/AuthProvider';
import AllCollection from './Pages/AllCollection/AllCollection';
import BicycleDetails from './Pages/BicycleDetails/BicycleDetails';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="align">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/allCollection">
              <AllCollection />
            </Route>
            <PrivateRoute path="/bicycle/:id">
              <BicycleDetails />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
