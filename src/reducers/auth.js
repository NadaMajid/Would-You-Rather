import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';

export default function authenticate(state = {}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: action.authenticated,
                user: action.user
            };
            
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authenticated: action.authenticated,
                user: action.user
            };

        default:
            return state;
    }
}