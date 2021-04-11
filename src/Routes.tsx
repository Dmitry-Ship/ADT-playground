import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Settings = lazy(() => import("./pages/Settings"));

export default function Routes() {
  return (
    <Router>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <nav className="hidden md:flex space-x-10">
          <Link
            className="text-base font-medium text-gray-500 hover:text-gray-900"
            to="/home"
          >
            Home
          </Link>

          <Link
            className="text-base font-medium text-gray-500 hover:text-gray-900"
            to="/settings"
          >
            Settings
          </Link>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}
