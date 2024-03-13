import { createStore } from "redux";
import formReducer from "./reducers/reducer";

const store = createStore(formReducer);

export default store;
