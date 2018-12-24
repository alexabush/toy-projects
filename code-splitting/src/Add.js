import React, { PureComponent } from 'react';

function getNum() {
  return import('./math').then(math => {
    return math.add(16, 26);
  });
}

const addition = React.lazy(() => (<Addition num={getNum()} />))


class Add extends PureComponent {
  render() {
    return (
      <div>
        <h2>Add!</h2>
        {/* {addition} */}
      </div>
    );
  }
}

class Addition extends PureComponent {
  render() {
    return (
      <div>
        {this.props.num}
      </div>
    )
  }
}


export default Add;
