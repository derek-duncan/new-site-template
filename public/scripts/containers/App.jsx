import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

class App extends Component {

  render() {

    const { dispatch, routing, children, history } = this.props;

    return (
      <div>
        <p>Hello world!</p>
      </div>
    );
  }
}

App.propTypes = {};

const routingSelector = createSelector(

  state => {
    return state.routing
  },
  (routing) => {

    return {
      routing,
    }
  }
);

export default connect(routingSelector)(App);
