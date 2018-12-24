import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Add from './Add';

const About = () => Greeting();
const About = () => Greeting();
const Users = () => <h2>Users</h2>;
const Math = () => <h2>Math</h2>;

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
};

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
          <li>
            <Link to="/users/">Users</Link>
          </li>
          <li>
            <Link to="/math/">Math</Link>
          </li>
          <li>
            <Link to="/add/">Add</Link>
          </li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} />
      <Route path="/math/" component={Math} />
      <Route path="/add/" component={Add} />
    </div>
  </Router>
);

export default AppRouter;
