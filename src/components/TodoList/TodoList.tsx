import { ITodo } from '../../interfaces/ITodo';
import TodoItem from '../TodoItem/TodoItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type TodoListProps = {
  todos: ITodo[];
  filter: string;
  onTodoToggleAll: () => void;
  onTodoToggle: (id: string, completed: boolean) => void;
  onTodoEdit: (id: string, title: string) => void;
  onTodoDestroy: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  onTodoToggleAll,
  onTodoToggle,
  onTodoEdit,
  onTodoDestroy,
}) => {
  const completed = todos.every((todo) => todo.completed);
  const mark = !completed ? 'completed' : 'active';
  const [parent] = useAutoAnimate(/* optional config */);

  if (filter === 'active') {
    todos = todos.filter((todo) => !todo.completed);
  } else if (filter === 'completed') {
    todos = todos.filter((todo) => todo.completed);
  }

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        data-testid="toggle-all"
        type="checkbox"
        checked={completed}
        onChange={onTodoToggleAll}
      />
      <label htmlFor="toggle-all" title={`Mark all as ${mark}`}>
        Mark all as {mark}
      </label>
      <ul className="todo-list" ref={parent}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onTodoToggle={() => onTodoToggle(todo.id, !todo.completed)}
            onTodoEdit={() => onTodoEdit(todo.id, todo.title)}
            onTodoDestroy={() => onTodoDestroy(todo.id)}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
