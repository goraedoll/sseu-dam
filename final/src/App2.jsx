import { useState } from "react";

function App2(){

const [number, setNumber]= useState(0);
let num = 0;

const plusNum = () =>{
    //num++;
    //num = 30;
    //number++
    //number=number+1
    setNumber(number+1)
}

return(
    <div>
        <h1>{number}</h1>
        <button onClick={plusNum}>PLUS</button>
    </div>
)

}

export default App2