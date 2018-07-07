import { SET_IMAGES,ADD_IMAGE} from "./actions";

export default function game(state=[],action = {}) {
    switch(action.type){
        case ADD_IMAGE:
          return [...state,action.data];
        case SET_IMAGES:
          return action.data;
        default: return state;
    }
}
