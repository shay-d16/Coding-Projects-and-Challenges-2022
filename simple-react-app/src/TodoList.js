// Type in "rfc" (react function component) and hit Enter to generate a function component in React 

import React from 'react'
import Todo from './Todo'

export default function TodoList({ todos, toggleTodo }) { //pass in 'todos' and 'toggleTodo' props
  return (
    // We want to print out each one of our todos, which can be done easily with a loop. We'll do this 
    // by mapping over our current array and return elements of our todos. 
    // Create a 'Todo' component (Todo.js)
    todos.map(todo => {
        return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
        // For each one of our todos we want to return a 'todo' element/component
        
        // NOTE: without the 'key' attribute, the console will show an error that says "Each child in
        // in a list should have a unique 'key' prop", which is essentially saying that React doesn't 
        // know how to update this list properly; every time the todos array changes, it's going to 
        // re-render every single todo in that list, but we only want it to re-render the ones that
        // change. So we have to set a 'key' here and it has to be a unique element for the array
        // you're using it with. 

        // We can't just store the name of our todo, we need to store an object that says whether
        // or not it's complete, so it needs an id as well as a name
    })
  )
}

