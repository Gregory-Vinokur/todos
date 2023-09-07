import { render, fireEvent, screen, renderHook } from '@testing-library/react';
import TodoList from './TodoList';
import { useTodos } from '../../hooks/useTodos';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';

vi.mock('@formkit/auto-animate/react', () => ({
  useAutoAnimate: vi.fn((config) => [config]), // Мокируем useAutoAnimate
}));

// Создаем фейковые todos для тестов
const fakeTodos = [
  {
    id: 1,
    title: 'Todo 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Todo 2',
    completed: true,
  },
  {
    id: 3,
    title: 'Todo 3',
    completed: false,
  },
];

describe('Тесты компонента TodoList', () => {
  test('Фильтрация по "active"', () => {
    // Инициализируем состояние todos
    const { result } = renderHook(() => useTodos());
    const { handleTodoToggle } = result.current;
    act(() => {
      result.current.todos = fakeTodos;
    });

    // Отображаем TodoList с фильтром "active"
    render(
      <TodoList
        todos={fakeTodos}
        filter="active"
        onTodoToggleAll={() => {}}
        onTodoToggle={handleTodoToggle}
        onTodoEdit={() => {}}
        onTodoDestroy={() => {}}
      />
    );

    // Проверяем, что на экране отображаются только активные todos
    expect(screen.getByText('Todo 1')).toBeDefined();
    expect(screen.getByText('Todo 3')).toBeDefined();
    expect(screen.queryByText('Todo 2')).toBeNull();
  });

  test('Переключение статуса сразу у всех todos', () => {
    // Инициализируем состояние todos
    const { result } = renderHook(() => useTodos());
    const { todos, handleTodoToggleAll } = result.current;
    act(() => {
      result.current.todos = fakeTodos;
    });

    // Отображаем TodoList с todos и кнопкой "Mark all as completed"
    render(
      <TodoList
        todos={todos}
        filter="all"
        onTodoToggleAll={handleTodoToggleAll}
        onTodoToggle={() => {}}
        onTodoEdit={() => {}}
        onTodoDestroy={() => {}}
      />
    );

    // Проверяем, что все todos отображаются как незавершенные
    const toggleAllCheckbox = screen.getByTestId('toggle-all');

    // Нажимаем на кнопку "Mark all as completed"
    fireEvent.click(toggleAllCheckbox);

    // Проверяем, что все todos поменяли статус на противоположный
    expect(todos.every((todo) => !todo.completed)).toBe(true);
  });
});
