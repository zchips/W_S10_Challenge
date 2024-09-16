import React, { useReducer } from 'react';
import { usePlaceOrderMutation } from '../state/api';



const CHANGE_INPUT = 'CHANGE_INPUT';
const RESET_FORM = 'RESET_FORM';
const CHANGE_CHECKED = 'CHANGE_CHECKED';

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false,
  
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CHECKED: {
      const { name, checked } = action.payload;
      return { ...state, [name]: checked };
    }
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
};

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [placeOrder, { error: creationError, isLoading: creatingOrder }] = usePlaceOrderMutation(); // Corrected hook

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } });
  };

  const onToggle = ({ target: { name, checked } }) => {
    dispatch({ type: CHANGE_CHECKED, payload: { name, checked } });
  };

  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };

  const onNewOrder = (evt) => {
    evt.preventDefault();
    const { fullName, size, ...toppings } = state;
    const selectedToppings = Object.keys(toppings).filter((tp) => toppings[tp] === true);
    placeOrder({ fullName, size, toppings: selectedToppings }) // Use placeOrder instead
      .unwrap()
      .then((data) => {
        console.log(data.message);
        resetForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingOrder && <div className="pending">Order in progress...</div>}
      {creationError && <div className="failure">Order failed: {creationError.data.message}</div>}

      {/* Customer Name Input */}
      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            onChange={onChange}
            value={state.fullName}
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      {/* Size Selection */}
      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={state.size}
            onChange={onChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      {/* Toppings Selection */}
      <div className="input-group">
        {['Pepperoni', 'Greenpeppers', 'Pineapple', 'Mushrooms', 'Ham', 'Sausage', 'Bacon', 'Extra Cheese'].map((topping, index) => (
          <label key={topping}>
            <input
              data-testid={`check${topping}`}
              name={(index + 1).toString()}
              type="checkbox"
              onChange={onToggle}
              checked={state[(index + 1).toString()]}
            />
            {topping}
            <br />
          </label>
        ))}
      </div>

      {/* Submit Button */}
      <input data-testid="submit" type="submit" />
    </form>
  );
}