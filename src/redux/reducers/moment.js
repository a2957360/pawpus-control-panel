import {
  MOMENT_ADD_SUCCESS,
  MOMENT_GET_SUCCESS,
  MOMENT_REPORT_GET_SUCCESS,
  MOMENT_SINGLE_GET_SUCCESS,
  CLEAR_MESSAGE,
  LOG_OUT
} from '../constants/ActionType';

const INIT_STATE = {};

export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case MOMENT_ADD_SUCCESS: {
      return {
        ...state,
        singleData: action.payload.data,
        data: action.payload.data,
        reportData: action.payload.data,
        message: action.payload.message
      };
    }

    case MOMENT_GET_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        message: action.payload.message
      };
    }

    case MOMENT_REPORT_GET_SUCCESS: {
      return {
        ...state,
        reportData: action.payload.data,
        message: action.payload.message
      };
    }

    case MOMENT_SINGLE_GET_SUCCESS: {
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
