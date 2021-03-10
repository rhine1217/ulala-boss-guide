import './App.css';
import { Route, Switch } from 'react-router-dom'

import GameConfigsPage from './pages/GameConfigsPage'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <Switch>
        <Route exact path='/' render={() => 
          <GameConfigsPage />
        }/>
      </Switch>
    </div>
  );
}

export default App;
