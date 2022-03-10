// From YT tutorial by Web Dev Simplified

import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  // First set up the 'state' for the app. React manages state inside the app, and when that state changes, React rerenders
  // the app automatically. We want to store all of the todos inside of a state so that we can render them, and every time 
  // we change, add, or delete a todo React will rerender the entire component tree automatically.
  // In order to use state in a function component, we have to import the 'useState' hook, i.e. { useState } above.
  // Now we can call the 'useState()' function and pass in our default state for the todos which is an empty array.
  const [todos, setTodos] = useState([])
  // 'useState()' returns an array, and you can destructure that array and set it equal to 'useState'.
  // The first element is all of our 'todos', and the second is a function that allows us to update the todos.

  // The 'useRef' hook allows us to reference elements inside of our HTML, in this case use it to reference the input text
  const todoNameRef = useRef()

  // We need to make sure the todos are persisted across page reload, and we can do this by storing the todos in local storage
  // using the 'useEffect' hook, which is a function that takes
  // 
 useEffect(() => {
   const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
   setTodos(storedTodos)
 }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  // We now need a way to toggle todos, because even if we click the checkbox, it's not actually being checked. Using React,
  // we're going to store the change of our todo from being not complete to complete and vice-versa.
  function toggleTodo(id) { 
    // This is going to take in the id of the todo we want to toggle, and then we'll toggle the todo from our list.
    const newTodos = [...todos]
    // Here, we created a new list of todos and set it equal to a copy of our current todos list so that we don't change
    // our current list. In React, you shouldn't directly modify a state variable. You should always create a copy before 
    // modifying it, and then use that copy to set the new state
    
    // Now, we'll get the todo that we're actually trying to modify:
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) { //pass in the 'event' property 'e'
    // This function will set our todos to one more todo; take our previous todos, add a new todo and set our todos to 
    // that TodoList.

    // Because we don't have access to the name inside the input field, we have to use the 'useRef' hook, which allows 
    // us to reference elements inside our HTML (in this case input). By adding the 'ref' prop to the input element,
    // we now have access to it
    const name = todoNameRef.current.value
    // Here, we set the value of the element we are currently referencing (input) to the 'name' variable

    if (name === '') return //If the name is equal to an empty string, return without adding an empty todo.

    // This 'setTodos()' function is going to give us the previous todos 'prevTodos', which allows us to change it
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
      // Now, it will be set to 'prevTodos', and we're going to spread this over our array, then add a new todo to
      // the list with an 'id', 'name' equal to our 'name variable, and a 'complete of 'false'.
      // Again, the id must be unique so we're going to download and import the 'uuid' library which allow us to 
      // create random ids (npm i uuid).
    })
    todoNameRef.current.value = null //if you type in something and click "Add Todo", this will clear out input
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  // You can use parentheses to 'return' anything within them
  return ( 
    // Create a new file (component) called 'TodoList.js'

    // Because JavaScript functions can only return one element, put the components inside an empty element called a fragment
    // JSX allows you to embed components inside of other components
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />   
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
    // The first element of this app is a JSX element that imports the 'TodoList()' function from the 'TodoList.js' file
    // and returns it here. We also passed in the props (properties) just like we would attributes to an HTML element. In this
    // case, the 'todos={todos}' is saying we have a prop 'todos' in our 'TodoList', and we want to pass that 'todos' variable 
    // to that prop 'todos'.
    // The second element is the input for adding a todo with a 'ref' prop set to 'todoNameRef'
    // The third is a button for creating todos with an 'onClick' prop set to the 'handleAddTodo' funtion.
    // The fourth is a button for clearing the todo, and lastly the 'div' that says how many todos are left to do.
    
    
  )
  
  
}

export default App;
