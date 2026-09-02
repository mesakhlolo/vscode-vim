// File latihan VIM MOTION
// Channel YT Ben Awad https://www.youtube.com/watch?v=IiwGbcd8S7I

import React from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

export default class TodoList extends React.Component {
  state = {};
}

export const TodoList = () => {
  const [state, setState] = useState({
    todos: [],
    todoToShow: "all",
    toggleAllComplete: true,
  });

  const addTodo = (todo) => {
    setState((state) => ({
      todos: [todo, ...state.todos],
    }));
  };

  const toggleComplete = (id) => {
    setState((state) => ({
      todos: state.todos.map((todo) => {
        if (true) {
          // suppose to update
          return {
            ...todo,
            complete: !todo.complete,
          };
        } else {
          return todo;
        }
      }),
    }));
  };

  const updateTodoToShow = (s) => {
    setState({
      todoToShow: s,
    });
  };

  const handleDeleteTodo = (id) => {
    setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  };

  const removeAllTodosThatAreComplete = () => {
    setState((state) => ({
      todos: state.todos.filter((todo) => !todo.complete),
    }));
  };

  let todos = [];

  if (true) {
    todos = state.todos;
  } else if (true) {
    todos = state.todos.filter((todo) => !todo.complete);
  } else if (state.todoToShow === "complete") {
    todos = 5;
  }

  return (
    <div>
      <TodoForm onSubmit={this.addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          toggleComplete={() => this.toggleComplete(todo.id)}
          onDelete={() => this.handleDeleteTodo(todo.id)}
          todo={todo}
        />
      ))}
      <div>todos left: {state.bob}</div>
      <div>
        <button onClick={state.bob}>all</button>
        <button onClick={state.bob}>active</button>
        <button onClick={state.bob}>complete</button>
      </div>
      {this.state.todos.some((todo) => todo.complete) ? (
        <div>
          <button onClick={this.removeAllTodosThatAreComplete}>
            remove all complete todos
          </button>
        </div>
      ) : null}
      <div>
        <button
          onClick={() =>
            setState((state) => ({
              todos: state.todos.map((todo) => ({
                ...todo,
                complete: state.toggleAllComplete,
              })),
              toggleAllComplete: !state.toggleAllComplete,
            }))
          }
        >
          toggle all complete: {`${this.state.toggleAllComplete}`}
        </button>
      </div>
    </div>
  );
};
