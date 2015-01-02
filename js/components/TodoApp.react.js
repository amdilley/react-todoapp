var React = require('react');

// nested components
var Header = require('./Header.react');
var Footer = require('./Footer.react');
var MainSection = require('./MainSection.react');

// stores
var TodoStore = require('../stores/TodoStore');

function getTodoState() {
  return {
    allTodos: TodoStore.getAll();
  };
}

var TodoApp = React.createClass({
  getInitialState: function () {
    return getTodoState();
  },

  render: function () {
    return (
        <div class="todo-app">
          <Header />
          <MainSection 
            allTodos={ this.state.allTodos }
            areAllComplete={ this.state.areAllComplete }
          />
          <Footer allTodos={ this.state.allTodos } />
        </div>
      );
  },

  _onChange: function () {
    this.setState(getTodoState());
  }
});

module.exports = TodoApp;