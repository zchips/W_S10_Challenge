import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPizzaHistoryQuery } from '../state/api'; // Referring to the renamed file
import { setFilter } from '../state/pizzaFormSlice';

export default function OrderList() {
  // Fetch pizza orders using a query
  const { data: orders } = useGetPizzaHistoryQuery(); // Efficient data fetching with a single hook
  const sizeFilter = useSelector((state) => state.filter.filter); // Get size filter from Redux store
  const dispatch = useDispatch(); // Dispatch actions for filtering

  // Helper function to get toppings string
  const getLenStr = (num) => {
    return `${num} topping${num === 1 ? '' : 's'}`; // Simplified pluralization logic
  };

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {orders // Ensure data exists before mapping
          ?.filter(({ size }) => sizeFilter === 'All' || size === sizeFilter) // Filter by selected size
          .map(({ id, customer, size, toppings }) => (
            <li key={id}>
              <div>
                {`${customer} ordered a size ${size} with ${getLenStr(toppings?.length || 0)}`}
              </div>
            </li>
          ))}
      </ol>

      <div id="sizeFilters">
        Filter by size:
        {['All', 'S', 'M', 'L'].map((size) => {
          const className = `button-filter${size === sizeFilter ? ' active' : ''}`; // Add active class for the selected filter
          return (
            <button
              key={size}
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => dispatch(setFilter(size))} // Dispatch action on click
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
