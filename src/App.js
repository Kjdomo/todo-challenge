import "./App.css";
import { useState, useRef} from "react";
import Form from "./Components/Form";
import Input from "./Components/Input";
import FormContainer from "./Components/FormContainer";
import Button from "./Components/Button";
import TodoContainer from "./Components/TodoContainer";
import Todo from "./Components/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [formTodoInput, setFormTodoInput] = useState("");
  const todoRef = useRef("");

  const addToTodos = (e) => {
    e.preventDefault();
    if (formTodoInput) {
      setTodos([...todos, formTodoInput]);
      setFormTodoInput("");
    }
  };
  const deleteTodo = (index) => {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index+1)];
    setTodos(newTodos);
  };
  const updateTodo = (index) => {
    if (formTodoInput) {
      const newTodos = [...todos];
      newTodos[index] = formTodoInput;
      setTodos(newTodos);
      setFormTodoInput("");
    }
  };
  const formChange = () => {
    setFormTodoInput(todoRef.current.value);
  };

  const btnStyles = {
    marginTop: "20px",
    marginLeft: "5px",
    marginRight: "5px",
  };

  return (
    <div className="App">
      <FormContainer>
        <Form onSubmit={addToTodos} >
          <Input onChange={formChange} ref={todoRef} name="text" type="text" placeholder="todo text" />
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>

      <TodoContainer>
        {todos.map((todo, index) => (
          <Todo key={index}>
            <h1>{todo}</h1>
            <Button onClick={(e) => {
              e.preventDefault();
              deleteTodo(index);
            }} style={btnStyles}>Delete</Button>
            <Button onClick={(e) => {
              e.preventDefault();
              updateTodo(index)
            }} style={btnStyles}>Update</Button>
          </Todo>
        ))}
      </TodoContainer>
    </div>
  );
}

export default App;
