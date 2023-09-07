import { screen, render, fireEvent, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { useTodos } from '../../hooks/useTodos';

describe('Тесты компонента Header', () => {
  test('Успешно создаётся и сохраняется новое todo', () => {
    const { result } = renderHook(() => useTodos());
    const { handleTodoCreate } = result.current;
    render(<Header onTodoCreate={handleTodoCreate} />);
    const inputElement = screen.getByPlaceholderText('What needs to be done?');
    const newTodoText = 'New todo item';

    // Симулируем ввод текста в инпут
    fireEvent.change(inputElement, { target: { value: newTodoText } });

    // Симулируем нажатие клавиши Enter
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    // Проверяем, что инпут очистился после создания todo
    expect(inputElement).toHaveValue('');

    // Проверяем, что в массив todos добавился новый todo
    const { todos } = result.current;
    expect(todos).toContainEqual(
      expect.objectContaining({ title: newTodoText })
    );
  });
});
