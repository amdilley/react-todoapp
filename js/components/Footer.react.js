var React = require('react');
var ReactPropTypes = React.PropTypes;

// actions
var TodoActions = require('../actions/TodoAppActions');

var Footer = React.createClass({
  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  },

  render: function () {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;
    var completed = 0;
    var itemsLeft, itemsLeftPhrase, clearCompletedButton;

    if (total === 0) {
      return null;
    }

    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    itemsLeft = total - completed;
    itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    if (completed) {
      clearCompletedButton = 
        <button
          id="clear-completed"
          onClick={ this._onClearCompletedClick }>
          Clear completed ({ completed })
        </button>;
    }

    return (
        <footer id="footer">
          <span id="todo-count">
            <strong>{ itemsLeft }</strong>
            { itemsLeftPhrase }
          </span>
          { clearCompletedButton }
        </footer>
      );
  },

  _onClearCompletedClick: function () {
    TodoActions.destroyCompleted();
  }
});

module.exports = Footer;