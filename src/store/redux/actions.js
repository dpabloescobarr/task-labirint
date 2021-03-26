import {FETCH, ANSWER, START} from './types'

export function toServer(){

    return (dispatch, getState) => {


        const RECT = 3,
         ALL_STEPS = 10

        let MAP = []

        const randomInt = (border) => {
            return Math.ceil(Math.random() * border)
        };

        const validSteps = (elem) => {

            if(
            elem.x > 0 && elem.x < RECT + 1
            &&
            elem.y > 0 && elem.y < RECT + 1

            ) return elem
        }

        //стартовый квадрат
        (function init(){

            let inputX = randomInt(RECT),
                inputY = randomInt(RECT),
                countStep = 1

            if(!inputX || !inputY){

                init()

            }else{ 

                const x = randomInt(3),
                      y = randomInt(3)

                genOneStep({ x: x, y: y}, countStep)

                dispatch(start(x, y))
            }

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
                dispatch(response(MAP))
            }
            
        }, 1000)

        return true
    }
    
}

const response = (map) => ({
    type: FETCH,
    map: map
});



export function answer(){
    return (dispatch, getState) => { 

        let step = getState(toServer).currStep.step,
            coords = {
                x: step.x,
                y: step.y
            }

        dispatch(getAnswer(coords)) 
    }
}

const getAnswer = (coords) => ({
    type: ANSWER,
    coords: coords
})

export const start = (x, y) => ({

    type: START,
    x: x,
    y: y
})