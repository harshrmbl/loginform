export const setInputValue = (name, value) => ({
  type: "SET_INPUT_VALUE",
  payload: { name, value },
});

export const submitForm = (formData) => ({
  type: "SUBMIT_FORM",
  payload: formData,
});

export const deleteItem = (index)=>({
  type: "DELETE_ITEM",
  payload: index,
});

export const editItem = (index, newName) => ({
  type: "EDIT_ITEM",
  payload: { index, newName },
});

export const fetchItems = () => ({
  type: "FETCH_ITEMS", // Define your action type for fetching items
});

export const saveEdit = (id, newName) => ({
  type: "SAVE_EDIT", // Define your action type for saving edit
  payload: { id, newName },
});
