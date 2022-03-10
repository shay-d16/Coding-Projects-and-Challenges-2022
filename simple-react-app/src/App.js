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
  useEffect(() => {
    // In this function will be called to load the todos
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //use 'JSON.parse' to convert the string to an array
    //Here we set the value to what we get back from our stored todos in the 'storedTodos' variable, which is then passed
    // to the 'setTodos' function
    if (storedTodos) setTodos(storedTodos) //we set our todos to that 'storedTodos' only if we have stored todos
  }, []) 
  // We will only want to call this function once right when the component loads, so if we pass in an empty array of
  // dependancies, it will call this function once. Since the empty array never changes, it will never re-call this 
  // 'useEffect' function.

  useEffect(() => {
  // This takes a function as it's first parameter, and it will be called every time something changes. The way we determine 
  // when to call that function is by passing in an array of properties here.
  // This array is going to be all of our dependancies.
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  // So any time our array of todos changes, it will run this 'useEffect' function and save the todos in the variable above
  // called 'LOCAL_STORAGE_KEY'. We also used ''JSON.stringify' to make sure the todo is passed as a string.
  
  // At this point, the todos are saved to the local storage, but still don't show up when the page refreshes. This is 
  // because we'll need to have another 'useEffect', located above this function.


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
    // We can get this new todo by finding the todo that has a 'todo.id' equal to the id that was passed into this 
    // 'toggleTodo' function.
    todo.complete = !todo.complete
    // Here, we are setting 'todo.complete' equal to the opposite of 'todo.complete', then we can set the todos to
    // 'newTodos'
    setTodos(newTodos)
    // This function allows us toggle between complete and incomplete (checked and unchecked).
    // To use this function, we have to pass it down to our 'TodoList' as a prop, then import the prop to the 
    // 'TodoList.js' and 'Todo.js' components and pass it down to individual todos.
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
    // This function will set our todos to the new list that doesn't have any of our completed todos
    const newTodos = todos.filter(todo => !todo.complete) //the value is filtered to all the todos that are not complete.
    setTodos(newTodos)
    // Now when you refresh, it only shows the incomplete todos on the list.
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
    // case, the 'todos={todos}' is saying we have a prop 'todos' in our 'TodoList', and we want to pass the value of the 'todos' 
    // variable to the prop 'todos', as well as the 'toggleTodo' prop.
    
    // The second element is the input for adding a todo with a 'ref' prop set to 'todoNameRef'
    
    // The third is a button for creating todos with an 'onClick' prop set to the 'handleAddTodo' funtion.
    
    // The fourth is a button for clearing the todo by using an 'onClick' event listener to call the 'handleClearTodos' function.
    
    // The fifth is a 'div' that shows how many todos are left to do using a 'filter' function to filter all the todos that are
    // not checked and print the number of todos that are not complete.
    
    
  )
  
  
}

export default App;
