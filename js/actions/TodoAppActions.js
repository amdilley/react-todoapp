var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoAppConstants = require('../constants/TodoAppConstants');

var TodoAppActions = {
  /**
   * @param {string} text
   */
  create: function (text) {
    AppDispatcher.handleViewAction({
      actionType: TodoAppConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param {string} id The ID of the Todo item
   * @param {string} text
   */
  updateText: function (id, text) {
    AppDispatcher.handleViewAction({
      actionType: TodoAppConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether single Todo is complete
   * @param {object} todo
   */
  toggleComplete: function (todo) {
    var id = todo.id;
    var actionType;

    if (todo.complete) {
      actionType = TodoAppConstants.TODO_UNDO_COMPLETE;
    } else {
      actionType = TodoAppConstants.TODO_COMPLETE;
    }

    AppDispatcher.handleViewAction({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all Todos as complete
   */
  toggleCompleteAll: function () {
    AppDispatcher.handleViewAction({
      actionType: TodoAppConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param {string} id
   */
  destroy: function (id) {
    AppDispatcher.handleViewAction({
      actionType: TodoAppConstants.TODO_DESTROY,
      id: id
    });
  },

  /**
   * Delete all completed Todos
   */
  destroyCompleted: function () {
    AppDispatcher.handleViewAction({
      actionType: TodoAppConstants.TODO_DESTROY_COMPLETED
    });
  }
};

module.exports = TodoAppActions;