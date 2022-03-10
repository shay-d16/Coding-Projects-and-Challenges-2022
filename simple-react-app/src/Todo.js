import React from 'react'

export default function Todo({ todo, toggleTodo }) { //pass in the props
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
    // This will be the checkbox for the todos. Here, we will set the 'checked' property and set the value to 'todo.complete'
    <div>
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.name}
        </label>
    </div>
  )
}
