import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App(props) {

  const [map, setMap] = useState([]),
        table = useRef()



  function getCell(y, x){
    return y * 3 - 3 + x
  }

      useEffect(() => {


        // let start = props.store.actions.start,
        //    coords = props.store.getState(start()).start,
        //    numCell = getCell(coords.y, coords.y)

        // console.log(numCell)

        // const startCell = table.current.querySelector('#'+numCell)

        // console.log(startCell)



        let go = props.store.actions.toServer()
          props.store.dispatch(go)
        

        props.store.subscribe(() => {

            let step = props.store.actions.toServer,
                curr = props.store.getState(step()).currStep

              if(curr.payload === 'curr'){

                setMap(prev => {
                  return [...prev, curr]
                })
                
              }
        
        })

      }, []);


  function answer(){


    if(map.length === 10){

      let answer = props.store.actions.answer()
      props.store.dispatch(answer)

      props.store.subscribe(() => {

        let ans = props.store.actions.answer,
           best = props.store.getState(ans()).best,
           cells = table.current.querySelectorAll('.Square')
          
            let allRect = map.length - 1,
                 coords = best.coords


            const needCell = getCell(coords.y, coords.x)


            for(let cell of cells){

              if(cell.id == needCell){
                cell.setAttribute('style', 'background-color: red;')
              }

            }



      })
    }

  }




  return (

    

    <div className="App">

      <table ref={table}>
        <tbody>
          <tr>
            <td id="1" className="Square" onClick={answer}></td>
            <td id="2" className="Square" onClick={answer}></td>
            <td id="3" className="Square" onClick={answer}></td>
          </tr>
          <tr>
            <td id="4" className="Square" onClick={answer}></td>
            <td id="5" className="Square" onClick={answer}></td>
            <td id="6" className="Square" onClick={answer}></td>
          </tr>
          <tr>
            <td id="7" className="Square" onClick={answer}></td>
            <td id="8" className="Square" onClick={answer}></td>
            <td id="9" className="Square" onClick={answer}></td>
          </tr>
        </tbody>
      </table>

      <div class="steps" align="center" >

        { map.map(item => (
            <div key={item.i} class="small-square" >{item.step.side}</div>
        ))}
        
      </div>
    </div>
  );
}

export default App;
