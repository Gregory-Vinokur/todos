type FiltersProps = {
  filter: string;
  onFilterChange: (filter: string) => void;
};

const Filters: React.FC<FiltersProps> = ({ filter, onFilterChange }) => {
  const handleFilterClick = (newFilter: string) => {
    onFilterChange(newFilter);
  };

  return (
    <ul className="filters">
      <li>
        <a
          className={filter === '' ? 'selected' : ''}
          href="#/"
          onClick={() => handleFilterClick('')}
        >
          All
        </a>
      </li>
      <li>
        <a
          className={filter === 'active' ? 'selected' : ''}
          href="#/active"
          onClick={() => handleFilterClick('active')}
        >
          Active
        </a>
      </li>
      <li>
        <a
          className={filter === 'completed' ? 'selected' : ''}
          href="#/completed"
          onClick={() => handleFilterClick('completed')}
        >
          Completed
        </a>
      </li>
    </ul>
  );
};

export default Filters;
