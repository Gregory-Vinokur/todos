import { ITodo } from '../../interfaces/ITodo';
import Filters from '../Filters/Filters';

type FooterProps = {
  todos: ITodo[];
  filter: string;
  onTodoClearCompleted: () => void;
  onFilterChange: (filter: string) => void;
};

const Footer: React.FC<FooterProps> = ({
  todos,
  filter,
  onTodoClearCompleted,
  onFilterChange,
}) => {
  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = todos.length - completed;

  const handleClearCompletedClick = () => {
    onTodoClearCompleted();
  };

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{remaining}</strong> {remaining === 1 ? 'item' : 'items'} left
      </span>
      <Filters
        filter={filter}
        onFilterChange={(newFilter) => onFilterChange(newFilter)}
      />
      {!!completed && (
        <button className="clear-completed" onClick={handleClearCompletedClick}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
