import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    filter,
    handleTodoCreate,
    handleTodoEdit,
    handleTodoToggle,
    handleTodoToggleAll,
    handleTodoDestroy,
    handleTodoClearCompleted,
    handleFilterChange,
  } = useTodos();

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
