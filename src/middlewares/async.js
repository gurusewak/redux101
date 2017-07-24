export default function({ dispatch }) {

    return next => action => {
        console.log(action);
        if (!action.payload || !action.payload.then) {
            console.log('we have no promise');
            
            return next(action);
        }
        console.log('we have promise');

        action.payload
            .then(response => {
                const newAction = { ...action, payload: response };
                dispatch(newAction);
            })

    }
}