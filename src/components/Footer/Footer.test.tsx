import { render, fireEvent, renderHook, act } from '@testing-library/react';
import Footer from './Footer';
import { useTodos } from '../../hooks/useTodos';

describe('Тесты компонента Footer', () => {
  test('Удаление выполненных todos', () => {
    // Создаём todos со статусом completed: true
    const todos = [
      { id: 1, title: 'Todo 1', completed: true },
      { id: 2, title: 'Todo 2', completed: true },
      { id: 3, title: 'Todo 3', completed: true },
    ];

    // Получаем из хука useTodos() функцию-обработчик для удаления выполненных todos
    const { result } = renderHook(() => useTodos());
    const { handleTodoClearCompleted } = result.current;

    act(() => {
      result.current.todos = todos;
    });

    // Рендерим компонент Footer с моковыми данными
    const { getByText } = render(
      <Footer
        todos={todos}
        filter="all"
        onTodoClearCompleted={handleTodoClearCompleted}
        onFilterChange={() => {}}
      />
    );

    // Находим кнопку 'Clear completed' и кликаем на неё
    const clearCompletedButton = getByText('Clear completed');
    fireEvent.click(clearCompletedButton);

    // Проверяем, что массив todos больше не содержит выполненных todos
    const remainingTodos = result.current.todos.filter(
      (todo) => !todo.completed
    );
    expect(remainingTodos).toHaveLength(0);
  });

  test('Отображение правильного количества оставшихся задач и слов "item" или "items"', () => {
    // Создаём первый активный todo
    const firstTodo = { id: 1, title: 'Todo 1', completed: false };
    // Создаём второй активный todo
    const secondTodo = { id: 2, title: 'Todo 2', completed: false };

    const { result } = renderHook(() => useTodos());
    const { todos } = result.current;

    // Добавляем первый todo в массив todos из хука useTodos()

    act(() => {
      result.current.todos.push(firstTodo);
    });

    // Рендерим Footer с получившимся todos
    const { queryByText, rerender } = render(
      <Footer
        todos={todos}
        filter="all"
        onTodoClearCompleted={() => {}}
        onFilterChange={() => {}}
      />
    );

    // Проверяем, что отображается правильное количество задач и слово "item"
    expect(queryByText('1 item left')).toBeDefined();

    // Добавляем второй todo в массив todos
    act(() => {
      result.current.todos.push(secondTodo);
    });

    // Повторно рендерим компонент с обновлёнными данными
    rerender(
      <Footer
        todos={todos}
        filter="all"
        onTodoClearCompleted={() => {}}
        onFilterChange={() => {}}
      />
    );

    // Проверяем, что отображается правильное количество задач и слово "items"
    expect(queryByText('2 items left')).toBeDefined();
  });
});
