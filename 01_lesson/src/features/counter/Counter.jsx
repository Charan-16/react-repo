import {useSelector, useDispatch} from "react-redux";
import {
    increment, decrement , reset ,incrementByAmount } from './counterSlice';
    import { useState } from "react";

function Counter() {
    const count = useSelector((state) => state.Counter.count) ;
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount]= useState(0);
    const addValue = Number(incrementAmount) || 0 ;

    const resetAll = () => {
        setIncrementAmount(0);
        dispatch(reset());
    }
  return (
    <section>
        <p>Counter value : {count}</p>
        <div>
            <button onClick={()=> dispatch(increment())} style={{backgroundColor: "green"}}>+</button>
            <button onClick={()=> dispatch(decrement())}style={{backgroundColor: "red"}}>-</button>
        </div>
        <input type="text" value={incrementAmount} onChange={(e) => setIncrementAmount(e.target.value)}/>

        <div>
            <button onClick={() =>dispatch(incrementByAmount(addValue))}>Add Amount</button>
            <button onClick={resetAll}>Reset</button>
        </div>
    </section>
   
  )
}

export default Counter