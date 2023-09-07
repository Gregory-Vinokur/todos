import { screen, render, fireEvent, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import Filters from './Filters';
import { useTodos } from '../../hooks/useTodos';

describe('Тесты компонента Filters', () => {
  test('Нажатие на название фильтра выделяет его', () => {
    const { result } = renderHook(() => useTodos());
    const { handleFilterChange, filter } = result.current;

    const { rerender } = render(
      <Filters filter={filter} onFilterChange={handleFilterChange} />
    );

    // Получаем ссылку на фильтр "Active" и кликаем на неё
    const activeFilterLink = screen.getByText('Active');
    fireEvent.click(activeFilterLink);

    // Проверяем, что фильтр изменился
    expect(result.current.filter).toEqual('active');
    rerender(
      <Filters
        filter={result.current.filter}
        onFilterChange={handleFilterChange}
      />
    );

    // Проверяем, что у выбранного фильтра есть соответствующий класс
    expect(activeFilterLink).toHaveClass('selected');

    // Получаем ссылку на фильтр "Completed" и кликаем на неё
    const completedFilterLink = screen.getByText('Completed');
    fireEvent.click(completedFilterLink);

    // Проверяем, что фильтр изменился
    expect(result.current.filter).toEqual('completed');
    rerender(
      <Filters
        filter={result.current.filter}
        onFilterChange={handleFilterChange}
      />
    );

    // Проверяем, что у выбранного фильтра есть соответствующий класс
    expect(completedFilterLink).toHaveClass('selected');

    // Получаем ссылку на фильтр "All" и кликаем на неё
    const AllFilterLink = screen.getByText('All');
    fireEvent.click(AllFilterLink);

    // Проверяем, что фильтр изменился
    expect(result.current.filter).toEqual('');
    rerender(
      <Filters
        filter={result.current.filter}
        onFilterChange={handleFilterChange}
      />
    );

    // Проверяем, что у выбранного фильтра есть соответствующий класс
    expect(AllFilterLink).toHaveClass('selected');
  });
});
