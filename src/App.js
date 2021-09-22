import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CompanyPage } from "./pages/CompanyPage";
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            Welcome to Individual Page
          </Route>
          <Route path="/:orgName" component={CompanyPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
