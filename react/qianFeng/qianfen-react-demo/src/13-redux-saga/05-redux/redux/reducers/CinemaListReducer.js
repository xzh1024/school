export default function CinemaListReducer(
  prevState = {
    list: [],
  },
  action
) {
  const newState = { ...prevState };
  switch (action.type) {
    case 'change-list':
      newState.list = action.payload;
      console.log(newState);
      return newState;
    case 'change-cinema-list':
      newState.list = action.payload;
      console.log(newState);
      return newState;
    default:
      return prevState;
  }
}
