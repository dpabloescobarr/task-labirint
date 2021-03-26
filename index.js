const RECT = 10,
 ALL_STEPS = 10

let MAP = []

const randomInt = (border) => {
    return Math.round(Math.random() * border)
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
        genOneStep({ x: 5, y: 3}, countStep)
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

console.log(MAP)
