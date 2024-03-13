import formReducer from "./reducer";


function rootReducer(state={}, action){
  return{
    formReducer:formReducer(state.formReducer, action)
  }
}
export default rootReducer;
