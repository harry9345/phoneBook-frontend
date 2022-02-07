const noteReducer = (state = 0, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
      case 'TOGGLE_IMPORTANCE':{
        const id= action.data.id
        const noteTochange = state.find(n => n.id === id)
        const changeNote = {
          ...noteTochange,
          important: !noteTochange.important
        }
        return state.map(note => note.id !== id ? note : changeNote)
      }
      
    default:
      return state;
  }
};
const store = createStore(noteReducer);

store.dispatch({
    type='NEW_NOTE',
    data:{
        content:'html',
        important:true,
        id:1
    }
})
store.dispatch({
    type='NEW_NOTE',
    data:{
        content:'css',
        important:false,
        id:2
    }
})