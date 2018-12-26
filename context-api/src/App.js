import React, { Component, createContext } from 'react';

/* React.createContext is a method which is passed the initial value

The object returned contains the Provider and Consumer JSX blocks
*/
const Context = createContext('instructor');
let instructors = ['Matt', 'Elie', 'Joel', 'Michael']
class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello From App! Let's pass some data down!</h1>
        <Context.Provider value={instructors}>
          <Grandparent />
        </Context.Provider>
      </div>
    );
  }
}

const Grandparent = props => (
  <div>
    <h1>Grandparent</h1>
    <Parent />
  </div>
);

const Parent = props => (
  <div>
    <h1>Hello from Parent!</h1>
    <Child />
  </div>
);

const Child = props => (
  <div>
    <h1>Hello from Child!</h1>
    <Context.Consumer>
      {instructorName => {
        return (
        <div>
          <h2>Here are the instructors: </h2>
          <ul>
              {getJSXList(instructorName)}
          </ul>
        </div>
        )
        }}
    </Context.Consumer>
  </div>
);

function getJSXList(list) {
  return list.map(item => {
    return <li>{item}</li>
  })
}

export default App;
