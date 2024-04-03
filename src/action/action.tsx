interface InputValuePayload{
  name: string;
  value:any;
}

interface SubmitFormPayload {
  formData: {
   
    key1: string;
    key2: number;
    
  };
}

interface EditItemPayload { 
  index: number;
  newName: string;
}

interface SaveEditPayload{
  id: string;
  newName:string;
}

type ActionType = 
|"SET_INPUT_VALUE"
|"SUBMIT_FORM"
|"DELETE_ITEM"
|"EDIT_ITEM"
|"FETCH_ITEMS"
|"SAVE_EDIT";


export const setInputValue = (name:string, value:any):{type:ActionType; payload: InputValuePayload }=> ({
  type: "SET_INPUT_VALUE",
  payload: { name, value },
});

export const submitForm = (formData: SubmitFormPayload):{type:ActionType; payload: SubmitFormPayload} => ({
  type: "SUBMIT_FORM",
  payload: formData,
});

export const deleteItem = (index: number): {type:ActionType; payload: number}=>({
  type: "DELETE_ITEM",
  payload: index,
});

export const editItem = (index:number, newName:string):{type:ActionType; payload:EditItemPayload} => ({
  type: "EDIT_ITEM",
  payload: { index, newName },
});

export const fetchItems = ():{type:ActionType} => ({
  type: "FETCH_ITEMS", 
});

export const saveEdit = (id:string, newName:string):{type:ActionType; payload:SaveEditPayload} => ({
  type: "SAVE_EDIT", 
  payload: { id, newName },
});
