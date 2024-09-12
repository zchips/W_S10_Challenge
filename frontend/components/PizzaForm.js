import React, { useState } from 'react';
import { usePlaceOrderMutation } from '../state/api'; // Correct import for usePlaceOrderMutation

const initialToppings = ['Pepperoni', 'Sausage', 'Mushrooms', 'Onions', 'Bacon', 'Extra cheese', 'Black olives', 'Green peppers', 'Pineapple', 'Spinach'];

// Helper function for rendering radio buttons (DRY principle)
const renderRadioGroup = (options, name, selectedValue, onChange) =>
  options.map(option => (
    <label key={option}>
      <input
        type="radio"
        name={name}
        value={option}
        checked={selectedValue === option}
        onChange={onChange}
        data-testid={`size-${option}`} // Simple test ID for each size option
      />
      {option}
    </label>
  ));

export default function PizzaForm() {
  const [placeOrder] = usePlaceOrderMutation(); // Using the correct mutation hook
  const [customer, setCustomer] = useState('');
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState([]);
  const [errors, setErrors] = useState({}); // For form validation

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    const newErrors = {};
    if (!customer) newErrors.customer = 'Name is required';
    if (!size) newErrors.size = 'Size is required';
    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
      await placeOrder({ customer, size, toppings }); // Use the mutation to place the order
      setCustomer('');
      setSize('');
      setToppings([]);
    }
  };

  // Handle toppings selection
  const handleToppingsChange = (event) => {
    const { value } = event.target;
    setToppings((prev) => prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Customer Input */}
      <div>
        <label>Full Name</label>
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          data-testid="fullNameInput" // Simple test ID for full name input
          placeholder="Enter full name"
        />
        {errors.customer && <p>{errors.customer}</p>}
      </div>

      {/* Size Selection */}
      <div> 
        <h3 data-testid="sizeSelect">Select Size</h3>
        {renderRadioGroup(['Small', 'Medium', 'Large'], 'size', size, (e) => setSize(e.target.value))}
        {errors.size && <p>{errors.size}</p>}
      
      </div>

      {/* Toppings Selection */}
      <div>
        <h3>Select Toppings</h3>
        {initialToppings.map(topping => (
          <label key={topping}>
            <input
              type="checkbox"
              value={topping}
              checked={toppings.includes(topping)}
              onChange={handleToppingsChange}
              data-testid={`topping-${topping}`} // Simple test ID for each topping checkbox
              data-testid="checkPepperoni"
              data-testid="checkGreenpeppers"
              data-testid="checkPinapple"
              data-testid="checkMushrooms"
              data-testid="checkHam"
            />
            {topping}
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <button type="submit" data-testid="submit">Place Order</button>
    </form>
  );
}
