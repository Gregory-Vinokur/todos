import { useState } from 'react';
import { KEY } from '../../constants/constants';

type HeaderProps = {
  onTodoCreate: (title: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onTodoCreate }) => {
  const [title, setTitle] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY.ENTER && title.trim() !== '') {
      event.preventDefault();
      const trimmedTitle = title.trim();
      setTitle('');
      onTodoCreate(trimmedTitle);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </header>
  );
};

export default Header;
