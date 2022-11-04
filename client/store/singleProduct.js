import axios from 'axios';

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

export const setSingleProduct = (product) => {
  return {
    type: SET_SINGLE_PRODUCT,
    product,
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};
