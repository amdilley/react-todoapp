var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoAppConstants = require('../constants/TodoAppConstants');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function create(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

  _todos[id] = {
    id: id,
    complete: false,
    text: text
  };
}

function update(id, updates) {
  _todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

function destroy(id) {
  delete _todos[id];
}

function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

var TodoStore = assign({}, EventEmitter.prototype, {
  /**
   * Tests whether all remaining Todo items are marked as completed
   * @return {boolean}
   */
  areAllComplete: function () {
    for (var id in _todos) {
      if (!_todos[id].complete) {
        return false;
      }
    }

    return true;
  },

  /**
   * Get entire collection of Todos
   * @return {object}
   */
  getAll: function () {
    return _todos;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;

  switch (action.actionType) {
    case TodoAppConstants.TODO_CREATE:
      text = action.text.trim();
      if (text) {
        create(text);
      }
      break;

    case TodoAppConstants.TODO_TOGGLE_COMPLETE_ALL:
      var isComplete = TodoStore.areAllComplete(); 
      updateAll({ complete: !isComplete });
      break;

    case TodoAppConstants.TODO_UNDO_COMPLETE:
      update(action.id, { complete: false });
      break;

    case TodoAppConstants.TODO_COMPLETE:
      update(action.id, { complete: true });
      break;

    case TodoAppConstants.TODO_UPDATE_TEXT:
      text = action.text.trim();
      if (text) {
        update(action.id, { text: text });
      }
      break;

    case TodoAppConstants.TODO_DESTROY:
      destroy(action.id);
      break;

    case TodoAppConstants.TODO_DESTROY_COMPLETED:
      destroyCompleted();
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here. We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  TodoStore.emitChange();

  return true; // needed by promise in Dispatcher
});

module.exports = TodoStore;