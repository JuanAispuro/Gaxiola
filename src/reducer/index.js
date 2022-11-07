import { actions } from "./actions";
import { initialState } from "./constants";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SEND_DATA_REQUEST:
      return {
        ...state,
        sendData: {
          ...state.sendData,
          loading: true,
          error: null,
          success: false,
        },
        steps: initialState.steps,
      };
    case actions.SEND_DATA_SUCCESS:
      return {
        ...state,
        sendData: {
          ...state.sendData,
          loading: false,
          success: true,
          data: action.payload.data,
        },
        steps: Object.keys(initialState.steps).map((key) => ({
          ...initialState.steps[key],
          image: action.payload.data.images[key] || null,
          passed: action.payload.data.images[key] ? true : false,
        })),
      };
    case actions.SEND_DATA_FAILURE:
      console.log(action.payload);
      return {
        ...state,
        sendData: {
          ...state.sendData,
          loading: false,
          error: action.payload.error,
        },
        steps: Object.keys(initialState.steps).map((key) => ({
          ...initialState.steps[key],
          image: action.payload.processImages[key] || null,
          passed: action.payload.processImages[key] ? true : false,
        })),
      };
    case actions.UPDATE_FORM_DATA:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};
export { reducer, actions, initialState };
