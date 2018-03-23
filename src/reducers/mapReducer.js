import ActionTypes from '../constants';

const INITIAL_STATE = {
    map: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.IS_FETCHING_MAP_COORDS :
            return state;
        default:
            return state;
    }
}