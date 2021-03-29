import {FETCH, ANSWER, START} from './types'

const randomInt = (border) => {
    return Math.round(Math.random() * border)
};

const RECT = 3,
 ALL_STEPS = 10

export function initCoords(){

    return dispatch => {
        

        let inputX = randomInt(RECT),
            inputY = randomInt(RECT)


        if(!inputX || !inputY){

            initCoords()

        }else{

            dispatch({
                type: START,
                x: inputX,
                y: inputY
            })
        }

    }
}


export function toServer(){

    return (dispatch, getState) => {

        let MAP = []

        const validSteps = (elem) => {

            if(
            elem.x > 0 && elem.x < RECT + 1
            &&
            elem.y > 0 && elem.y < RECT + 1

            ) return elem
        }

        //стартовый квадрат
        (function init(){

            const {x, y}  = getState().start
            let countStep = 1

            genOneStep({ x: x, y: y}, countStep)

        })();

        //расчет осуществляется индивидуально для каждого шага
        function genOneStep({x, y, side = null}, countStep){

            const possSteps = [
                {x: x - 1, y: y, side: 'left'},
                {x: x + 1, y: y, side: 'right'},
                {x: x, y: y - 1, side: 'up'},
                {x: x, y: y + 1, side: 'down'},
            ]

            const nextIndex = MAP.length
                
            let currStep = {},
                nextStep = 0,
                lengthCurrStep = 0


            for(let item of possSteps){

                if(!MAP[nextIndex]) MAP[nextIndex] = []

                currStep = validSteps(item)
                
                if(currStep){
                    MAP[nextIndex].push(currStep)
                    lengthCurrStep++
                }
            }
            
            nextStep = randomInt(lengthCurrStep - 1)

            MAP[nextIndex] = MAP[nextIndex][nextStep]


            if(countStep !== ALL_STEPS){

                countStep++
                genOneStep(MAP[nextIndex], countStep)
            }

        }


        let stepsCount = MAP.length,
            currStep = null



        setInterval(() => {

            currStep = getState(toServer).currStep.i

            if(stepsCount > currStep){
                dispatch({
                    type: FETCH,
                    map: MAP
                })
            }
            
        }, 1000)

        return true
    }
    
}



export function answer(){
    return (dispatch, getState) => { 

        let step = getState(toServer).currStep.step,
            coords = {
                x: step.x,
                y: step.y
            }

        dispatch({type: ANSWER, coords: coords })
    }
}