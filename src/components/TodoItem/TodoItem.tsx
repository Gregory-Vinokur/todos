import { useState } from 'react';
import { KEY } from '../../constants/constants';
import { ITodo } from '../../interfaces/ITodo';

type TodoItemProps = {
  todo: ITodo;
  onTodoToggle: (id: number, completed: boolean) => void;
  onTodoEdit: (id: number, title: string) => void;
  onTodoDestroy: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onTodoToggle,
  onTodoEdit,
  onTodoDestroy,
}) => {
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleToggleClick = () => {
    onTodoToggle(todo.id, !todo.completed);
  };

  const handleLabelDoubleClick = () => {
    setActive(true);
  };

  const handleInputBlur = () => {
    setActive(false);
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onTodoEdit(todo.id, trimmedTitle);
    } else {
      onTodoDestroy(todo.id);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      (event.key === KEY.ENTER || event.key === KEY.ESCAPE) &&
      event.currentTarget.className === 'edit'
    ) {
      setActive(false);
      const trimmedTitle = title.trim();
      if (trimmedTitle) {
        onTodoEdit(todo.id, trimmedTitle);
        console.log(title);
      } else {
        onTodoDestroy(todo.id);
      }
    }
  };

  const classes = ['todo-item'];
  if (active) {
    classes.push('editing');
  }
  if (todo.completed) {
    classes.push('completed');
  }

  return (
    <li className={classes.join(' ')}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleClick}
        />
        <label onDoubleClick={handleLabelDoubleClick}>{title}</label>
        <button className="destroy" onClick={() => onTodoDestroy(todo.id)} />
      </div>
      <input
        className="edit"
        value={title}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
      />
    </li>
  );
};

export default TodoItem;
