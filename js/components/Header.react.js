var React = require('react');

// nested components
var TodoTextInput = require('./TodoTextInput.react');

// actions
var TodoActions = require('../actions/TodoAppActions');

var Header = React.createClass({
  render: function () {
    return (
        <header id="header">
          <h1>todos</h1>
          <TodoTextInput
            id="new-todo"
            placeholder="What needs to be done?"
            onSave={ this._onSave }
          />
        </header>
      );
  },

  _onSave: function (text) {
    if (text.trim()) {
      TodoActions.create(text);
    }
  }
});

module.exports = Header;