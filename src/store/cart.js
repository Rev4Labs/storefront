import axios from 'axios';

const _updateQuantity = (cart, product, quantity) => {
  return {
    type: 'UPDATE_QUANTITY',
    cart,
    product,
    quantity,
  };
};

const _addToCart = ({ product, quantity }) => {
  return {
    type: 'ADD_TO_CART',
    product,
    quantity,
  };
};

const _addOrder = (order) => {
  return {
    type: 'ADD_ORDER',
    order,
  };
};

export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token,
      },
    });
    dispatch({ type: 'SET_CART', cart: response.data });
  };
};

export const addOrders = (obj) => {
  console.log('inside updateOrders', obj);
  let {
    first,
    last,
    address,
    city,
    state,
    zip,
    email,
    date,
    paymentMethod,
    transactionId,
    amount,
  } = obj;
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    const { data: updated } = await axios.post(
      '/api/orders/',
      {
        shipToName: `${first} ${last}`,
        shipToAddress: address,
        shipToCity: city,
        shipToState: state,
        shipToZip: zip,
        email,
        shipDate: date,
        paymentMethod,
        transactionId,
        amount,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    dispatch(_addOrder(updated));
  };
};

export const addToCart = (obj) => {
  let { product, quantity } = obj;
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios.post(
      '/api/orders/cart',
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    // Not using API response to update cart
    dispatch(_addToCart(obj));
  };
};

export const updateQuantity = (obj) => {
  let { product, quantity } = obj;
  return async (dispatch) => {
    const token = window.localStorage.getItem('token');
    await axios.put(
      '/api/orders/cart/',
      { product, quantity },
      {
        headers: {
          authorization: token,
        },
      }
    );
    // Not using API response to update cart
    dispatch(_updateQuantity(obj.cart, product, quantity));
  };
};

const initialState = { lineItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.cart;
    case 'UPDATE_QUANTITY':
      const updatedItems = state.lineItems.map((item) =>
        item.product.id === action.product.id
          ? { ...item, quantity: action.quantity }
          : item
      );
      return { ...state, lineItems: updatedItems };
    case 'ADD_TO_CART':
      return {
        ...state,
        lineItems: [
          ...state.lineItems,
          { product: action.product, quantity: action.quantity },
        ],
      };
    case 'ADD_ORDER':
      return initialState;
    default:
      return state;
  }
};

export default cartReducer;
