import { combineReducers } from "redux"
import {FETCH, ANSWER, START} from "./types"


function currStep(state = {i: 0, step: []}, action){
    
    if(action.type === FETCH){

        state = {
            step: action.map[state.i],
            i: state.i,
            payload: 'curr'
        }
        state.i++

        return state
    }

    return {
        ...state,
        payload: false
    }
}


function best(state = {coords: {}}, action){

    if(action.type === ANSWER){
        
        state.coords = action.coords
        state.payload = 'best'
        
        return state
    }

    return {
        ...state,
        payload: false
    }
}


function start(state = {x: 0, y: 0}, action){

    if(action.type === START){
        
        state.x = action.x
        state.y = action.y
        state.payload = 'START'
        
        return state
    }

    return {
        ...state,
        payload: false
    }
}

export default combineReducers({
    currStep: currStep,
    best: best,
    start: start
})