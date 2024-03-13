const initialState = {
  inputVal: {
    name: "",
    age: "",
    position: "",
    gender: "",
    terms: "",
  },
  arrList: [],
  inputtdVal: {
    name:"",
  }, 
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return {
        ...state,
        inputVal: {
          ...state.inputVal,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SUBMIT_FORM":
      return {
        ...state,
        arrList: [...state.arrList, action.payload],
        inputVal: {
          name: "",
          age: "",
          position: "",
          gender: "",
          terms: "",
        },
      };
    case "DELETE_ITEM":
      return {
        ...state,
        arrList: state.arrList.filter((_, index) => index !== action.payload),
      };
    case "EDIT_ITEM":
      return {
        ...state,
        arrList: state.arrList.map((item, index) =>
          index === action.payload.index
            ? { ...item, name: action.payload.newName }
            : item
        ),
      };
    default:
      return state;
  }
};

export default formReducer;
