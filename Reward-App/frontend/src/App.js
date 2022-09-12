import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Account from "./components/account-module/Account";
import Upload from "./components/upload/Upload";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Loader from "./components/comman/Loader";

const App = () => {

  const [title, setTitle] = useState("Reward Point");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.loader = setLoading;
  }, [])

  return (
    <div id="wrapper">
      <Router>
        <React.Fragment>
          <Sidebar setTitle={setTitle} />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar title={title} />
              <div className="container-fluid">
                <Switch>
                  <Route exact path="/" component={Account} />
                  <Route exact path="/upload" component={Upload} />
                </Switch>
              </div>
            </div>
          </div>
        </React.Fragment>
      </Router>
      {loading ? <Loader /> : null}
    </div>
  );
}
export default App;
