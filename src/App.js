import './App.css';
import React, { useState, useRef, useEffect } from 'react';

function App(props) {

  const [map, setMap] = useState([]),
        table = useRef()

  const store   = props.store,
        actions = store.actions


  const getCell = (y, x) => {
    return y * 3 - 3 + x
  }


  function colorMarkStart(x, y){
          
    const allCells = table.current.querySelectorAll('.Square')
    
    for(let cell of allCells){

      if(cell.id == getCell(y, x)){
        cell.style = 'background-color: green'
      }
    }

  }



  useEffect(() => {

    let initCoords = actions.initCoords()
        store.dispatch(initCoords)

    let go = actions.toServer()
        store.dispatch(go)
    
    const coords = store.getState().start,
          {x, y} = coords

    colorMarkStart(x, y)

    store.subscribe(() => {

        let curr = store.getState().currStep

          if(curr.payload === 'curr'){

            setMap(prev => {
              return [...prev, curr]
            })
            
          }
    
    })

  }, []);


  function answer(){


    if(map.length === 10){

      let answer = actions.answer()
          store.dispatch(answer)

      store.subscribe(() => {

        let best = store.getState().best,
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
