import { Action } from 'redux';

interface InputValues {
  name: string;
  age: string;
  position: string;
  gender: string;
  terms: boolean;
}

interface RootState {
  inputVal: InputValues;
  arrList: InputValues[];
}

interface AddDocumentAction extends Action {
  type: 'ADD_DOCUMENT';
  payload: InputValues;
}

interface SetInputValuesAction extends Action {
  type: 'SET_INPUT_VALUES';
  payload: InputValues;
}

type ActionTypes = AddDocumentAction | SetInputValuesAction;

const initialState: RootState = {
  inputVal: {
    name: "",
    age: "",
    position: "",
    gender: "",
    terms: false,
  },
  arrList: []
};

const rootReducer = (state: RootState = initialState, action: ActionTypes): RootState => {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return {
        ...state,
        arrList: [...state.arrList, action.payload]
      };
    case 'SET_INPUT_VALUES':
      return {
        ...state,
        inputVal: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
