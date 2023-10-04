import { useState, useEffect } from 'react';
import { ITodo } from '../interfaces/ITodo';
import { LOCAL_STORAGE_KEY } from '../constants/constants';
import { v4 as uuidv4 } from 'uuid';

export function useTodos() {
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
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleTodoCreate = (title: string) => {
    const newTodo = { id: uuidv4(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleTodoEdit = (id: string, title: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo
    );
    setTodos(updatedTodos);
  };

  const handleTodoToggle = (id: string, completed: boolean) => {
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

  const handleTodoDestroy = (id: string) => {
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

  return {
    todos,
    filter,
    handleTodoCreate,
    handleTodoEdit,
    handleTodoToggle,
    handleTodoToggleAll,
    handleTodoDestroy,
    handleTodoClearCompleted,
    handleFilterChange,
  };
}
