import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
 

  return (<div style={{height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
      <div className='timer'>
      <Timer />
      </div>
  </div>
  )
}

function Timer(){
  const[seconds, setSeconds] = useState()
  const[minutes, setMinutes] = useState()
  const[hours, setHours] = useState()
  const[isRunning, setisRunning] = useState(false);
  const[pause, setpause] = useState(true);
  const intervalRef = useRef(null);
  const minRef = useRef(null);
  const secRef = useRef(null);
  const startRef = useRef(null);

  function handleHours(e){
    const newValue = e.target.value;
    setHours(newValue)
    if(e.target.value.length>=2){
      minRef.current.focus();
    }
  }

  function handleHoursKeyDown(e){
    if(e.target.value.length >= 2 && e.key !== "Backspace" && e.key !== "Delete" &&
    e.key !== "Tab"){
      e.preventDefault();
      minRef.current.focus();
    }
  }

  function handleMinutes(e){
    const newValue = e.target.value;
    setMinutes(newValue)
    if(e.target.value.length>=2){
      secRef.current.focus();
    }
  }

  function handleMinutesKeyDown(e){
    if(e.target.value.length >= 2 && e.key !== "Backspace" && e.key !== "Delete" &&
    e.key !== "Tab"){
      e.preventDefault();
      secRef.current.focus();
    }
  }

  function handleSeconds(e){
    const newValue = e.target.value;
    setSeconds(newValue)
    if(e.target.value.length>=2){
      startRef.current.focus();
    }  }

    function handleSecondsKeyDown(e){
      if(e.target.value.length >= 2 && e.key !== "Backspace" && e.key !== "Delete" &&
      e.key !== "Tab"){
        e.preventDefault();
        startRef.current.focus();
      }
    }

  useEffect(() => {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
  }, [isRunning]);

  function startClock(){
    setpause(false);
    intervalRef.current = setInterval(function(){
      setSeconds((prevSeconds)=>{
        if(prevSeconds>0){
          return prevSeconds-1
        }else{
          setMinutes((prevMinutes)=>{
            if(prevMinutes > 0){
              return prevMinutes-1;
            }else{
              setHours((prevHours)=>{
                if(prevHours>0){
                  return prevHours-1;
                }else{
                  clearInterval(intervalRef.current)
                  setisRunning((prevValue) => !prevValue)
                  return 0;
                }
              })
              return 59;
            }
          })
          return 59;
        }
      })
    },1000)
  }

  function stopClock(){
    clearInterval(intervalRef.current);
    setpause(true)
  }

  function reset(){
    setisRunning((prevValue) => !prevValue);
    setpause((prevValue) => !prevValue);
  }


  return  <div>
    <div className='displayTime' style={{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", border:"0.5px solid #fff"}}>
      <span className='displayTime--single'>{hours}:</span>
      <span className='displayTime--single'>{minutes}:</span>
      <span className='displayTime--single'>{seconds}</span>
    </div>
    <div>
    <div className='inputs'>
    <input onChange={handleHours} onKeyDown={handleHoursKeyDown}  type="number" disabled={!pause}
    value={hours} />
    <input onChange={handleMinutes} onKeyDown={handleMinutesKeyDown} type="number" ref={minRef} disabled={!pause} value={minutes}/>
    <input onChange={handleSeconds} onKeyDown={handleSecondsKeyDown} type="number" ref={secRef} disabled={!pause} value={seconds}/>
    </div>
    </div>
    <div className='buttons'>
      <button onClick= {pause? startClock : stopClock} ref ={startRef}>{pause? "Start" : "Stop"}</button>
      <button onClick={reset} disabled={pause} >Reset</button>
    </div>
  </div>
}
export default App
