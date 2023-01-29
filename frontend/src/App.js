
import './App.css';
import { BrowserRouter as Router, Switch, Route, HashRouter,} from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Deploy from './Components/Deploy';
import Analytics from './Components/Analytics';
import DeployArgent from './Components/DeployArgent';


function App() {
  return (
    <>
      <HashRouter basename='/'>
    <div className="App">
       <Navbar/>

      <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/Deploy">
            <Deploy/>
          </Route>

          <Route exact path="/Analytics">
            <Analytics/>
          </Route>

          <Route exact path="/DeployArgent">
            <DeployArgent/>
          </Route>


          
        </Switch>

    </div>
    </HashRouter>
    </>
  );
}

export default App;
