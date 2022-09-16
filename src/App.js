import './App.css';
import {Switch , Route} from 'react-router-dom';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import EditUser from './Pages/EditUser';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/addUser" component={AddUser}/>
          <Route exact path="/editUser/:id" component={EditUser}/>

      </Switch>
    </div>
  );
}

export default App;
