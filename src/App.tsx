import { useState, useEffect } from 'react';
import { ITodo } from './interfaces/ITodo';
import { LOCAL_STORAGE_KEY } from './constants/constants';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    const route = () => {
      switch (window.location.hash) {
        case '#/active': {
          setFilter('active');
          break;
        }
        case '#/completed': {
          setFilter('completed');
          break;
        }
        case '#/': {
          setFilter('');
          break;
        }
        default: {
          setFilter('');
          window.location.hash = '#/';
        }
      }
    };

    route();

    window.addEventListener('hashchange', route);

    return () => {
      window.removeEventListener('hashchange', route);
    };
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const handleTodoCreate = (title: string) => {
    const newTodo = { id: todos.length + 1, title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleTodoEdit = (id: number, title: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
    setTodos(updatedTodos);
  };

  const handleTodoToggle = (id: number, completed: boolean) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleTodoToggleAll = () => {
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !todo.completed,
    }));
    setTodos(updatedTodos);
  };

  const handleTodoDestroy = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleTodoClearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className="todoapp">
      <Header onTodoCreate={handleTodoCreate} />
      {!!todos.length && (
        <TodoList
          todos={todos}
          filter={filter}
          onTodoToggleAll={handleTodoToggleAll}
          onTodoToggle={handleTodoToggle}
          onTodoEdit={handleTodoEdit}
          onTodoDestroy={handleTodoDestroy}
        />
      )}
      {!!todos.length && (
        <Footer
          todos={todos}
          filter={filter}
          onFilterChange={handleFilterChange}
          onTodoClearCompleted={handleTodoClearCompleted}
        />
      )}
    </div>
  );
}

export default App;
