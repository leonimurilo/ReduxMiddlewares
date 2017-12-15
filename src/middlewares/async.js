export default function({dispatch}){
  return function(next){
    return function(action){
      // if there is no payload or the payload is not a promise
      // then pass the action to the next middleware
      if(!action.payload || !action.payload.then){
        return next(action);
      }


      // wait the promise to resolve
      action.payload.then(function(response){
        // create an object which has everything the action has
        // plus the promise response as the payload (replace previous payload)
        const newAction = { ...action, payload: response.data}

              console.log("aqui", newAction);
        // take the new action and send it to the reducers
        dispatch(newAction);
      });

    }
  }
}
