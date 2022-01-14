import {
  SERVER_VALID_GET_SUCCESS,
  SERVER_WAIT_GET_SUCCESS,
  SERVER_SINGLE_GET_SUCCESS,
  SERVER_ADD_SUCCESS,
  CLEAR_MESSAGE,
  LOG_OUT
} from '../constants/ActionType';

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case SERVER_ADD_SUCCESS: {
      return {
        ...state,
        validData: action.payload.data,
        waitData: action.payload.data,
        message: action.payload.message
      };
    }

    case SERVER_VALID_GET_SUCCESS: {
      return {
        ...state,
        validData: action.payload.data,
        message: action.payload.message
      };
    }

    case SERVER_WAIT_GET_SUCCESS: {
      return {
        ...state,
        waitData: action.payload.data,
        message: action.payload.message
      };
    }

    case SERVER_SINGLE_GET_SUCCESS: {
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
