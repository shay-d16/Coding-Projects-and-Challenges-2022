import React from 'react'

export default function Todo({ todo, toggleTodo }) { //pass in the props
  function handleTodoClick() {
    toggleTodo(todo.id)
    // This function just calls the 'toggleTodo' function and passes in the 'todo.id'
  }
  return (
    // This will be the checkbox for the todos. Here, we will set the 'checked' property and set the value to 'todo.complete' and
    // used an 'onChange' attribute to call the 'handleTodoClick' function
    <div>
        <label>
            <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
            {todo.name}
        </label>
    </div>
    // Now when you check (or uncheck) the checkbox and refresh the page, you will see that React has stored the 'complete'
    // status inside of our todos, which is inside of local storage. So, every time you click the checkbox it calls the
    // 'handleTodoClick' function, which calls the 'toggleTodo' function with the id of the todo we are inside of; that, in turn,
    // gets passed up through 'TodoList.js' into our 'App.js' and calls up it's 'toggleTodo' function, which resets our 'TodoList'
    // variable to the new list of todos with the todo that we clicked on checked. 
  )
}
