import { render, fireEvent, renderHook, act } from '@testing-library/react';
import TodoItem from './TodoItem';
import { useTodos } from '../../hooks/useTodos';

const todo = {
  id: 1,
  title: 'Выполнить задачу',
  completed: false,
};

describe('Тесты компонента TodoItem', () => {
  test('Редактирование todo', () => {
    const { result } = renderHook(() => useTodos());
    const { handleTodoEdit } = result.current;

    // Добавляем todo в массив todos
    act(() => {
      result.current.todos.push(todo);
    });

    const { getByText, getByDisplayValue } = render(
      <TodoItem
        todo={todo}
        onTodoToggle={() => {}}
        onTodoEdit={handleTodoEdit}
        onTodoDestroy={() => {}}
      />
    );

    // Двойной клик на заголовке для активации редактирования
    const titleElement = getByText('Выполнить задачу');
    fireEvent.doubleClick(titleElement);

    // Находим и изменяем поле ввода
    const inputElement = getByDisplayValue('Выполнить задачу');
    fireEvent.change(inputElement, { target: { value: 'Изменённая задача' } });

    // Нажимаем клавишу Enter для сохранения изменений
    fireEvent.keyDown(inputElement, { key: 'Enter' });

    // Проверяем, что функция onTodoEdit изменила todo в массиве todos
    expect(result.current.todos).toContainEqual(
      expect.objectContaining({
        id: 1,
        title: 'Изменённая задача',
        completed: false,
      })
    );
  });

  test('Удаление todo', () => {
    const { result } = renderHook(() => useTodos());
    const { handleTodoDestroy } = result.current;

    act(() => {
      result.current.todos.push(todo);
    });

    const { getByText } = render(
      <TodoItem
        todo={todo}
        onTodoToggle={() => {}}
        onTodoEdit={() => {}}
        onTodoDestroy={handleTodoDestroy}
      />
    );

    // Кликаем по кнопке удаления с className 'destroy'
    const deleteButton = getByText('', { selector: '.destroy' });
    fireEvent.click(deleteButton);

    // Проверяем, что функция handleTodoDestroy удалила todo из массива todos
    expect(result.current.todos).not.toContainEqual(
      expect.objectContaining({
        id: 1,
        title: 'Выполнить задачу',
        completed: false,
      })
    );
  });

  test('Изменение статуса выполнения todo', () => {
    const { result } = renderHook(() => useTodos());
    const { handleTodoToggle } = result.current;

    act(() => {
      result.current.todos.push(todo);
    });
    const { getByTestId } = render(
      <TodoItem
        todo={todo}
        onTodoToggle={handleTodoToggle}
        onTodoEdit={() => {}}
        onTodoDestroy={() => {}}
      />
    );

    // Кликаем по чекбоксу для изменения статуса выполнения
    const toggleCheckbox = getByTestId('toggle');
    fireEvent.click(toggleCheckbox);

    // Проверяем, что функция onTodoToggle изменила статус todo в массиве todos
    expect(result.current.todos).toContainEqual(
      expect.objectContaining({
        id: 1,
        title: 'Выполнить задачу',
        completed: true,
      })
    );
  });
});
