import './App.scss';
import { Switch, Route } from 'react-router-dom'
import RepoDetails from "./DataTables/RepoDetails"
import Home from "./Home/Home"

export type sortingType = 'stars' | 'bestMatch' | undefined | string
export type direction = 'asc' | 'desc' | undefined

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={'/'} component={Home} exact/>
        <Route path={'/details'} component={RepoDetails} exact/>
      </Switch>
    </div>
  );
}

export default App;
