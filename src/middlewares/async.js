export default ({ dispatch }) => next => action => {
  // check to see if the action has a promise on 'payload'
  // If it does, wait for it to resolve
  // Else send the action onto the next middleware
  if (!action.payload || !action.payload.then) {
    return next(action);
  }

  // Wait for promise to resolve, get the data
  // create a new action and dispatch
  action.payload.then((response) => {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });

};