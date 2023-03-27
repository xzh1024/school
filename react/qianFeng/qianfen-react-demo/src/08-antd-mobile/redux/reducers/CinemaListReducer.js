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
      return newState;
    default:
      return prevState;
  }
}
