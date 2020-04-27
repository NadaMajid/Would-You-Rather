import { ADD_QUESTION, ADD_QUESTION_ANSWER, RECEIVE_QUESTIONS } from '../actions/questions';

export default function questions(state = {}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            };

        case ADD_QUESTION_ANSWER:
            return {
                ...state,
                [action.questionId]: {
                    ...state[action.questionId],
                    [action.selectedAnswer]: {
                        ...state[action.questionId][action.selectedAnswer],
                        votes: state[action.questionId][action.selectedAnswer].votes.concat([action.authedUser])
                    }
                }
            };
        
        default:
            return state;
    }
}