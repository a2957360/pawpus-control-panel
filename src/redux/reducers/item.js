import {
  ITEM_ADD_SUCCESS,
  ITEM_GET_SUCCESS,
  ITEM_SINGLE_GET_SUCCESS,
  CLEAR_MESSAGE,
  LOG_OUT
} from '../constants/ActionType';

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case ITEM_ADD_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case ITEM_GET_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case ITEM_SINGLE_GET_SUCCESS: {
      return {
        ...state,
        singleData: action.payload.data,
        message: action.payload.message
      };
    }

    case CLEAR_MESSAGE: {
      return {
          ...state,
          message: null,
          loginmessage: null,
      };
    }

    case LOG_OUT: {
      return {
          ...state,
          message: null,
          data: null,
      };
    }

    default:
      return state;
  }
};
