import React ,{useRef, useState} from 'react'
import './Quiz.css'
import { data } from '../../assets/data';
const Quiz = () => {

  let[index,setIndex]=useState(0);
  let[question,setQuestion]=useState(data[index]);
  let[lock,setLock]=useState(false);
  let[score,setScore]=useState(0);
  let[result,setResult]=useState(false)

  let Option1=useRef(null);
  let Option2=useRef(null);
  let Option3=useRef(null);
  let Option4=useRef(null);
 
  let option_array=[Option1,Option2,Option3,Option4];


  const checkAns=(e,ans)=>{
    if(lock==false){
      if(index===data.length -1){
        setResult(true);
        return 0;
      }
      if(question.ans==ans){
        e.target.classList.add("Correct");
        setLock(true);
        setScore(prev=>prev+1);
      }else{
        e.target.classList.add("Wrong");
        setLock(true);
        option_array[question.ans-1].current.classList.add("Correct");
       }

    }
  
  }

  const next=()=>{
       if(lock===true){
        setIndex(++index);
        setQuestion(data[index]);
        setLock(false);
        option_array.map((option)=>{
          option.current.classList.remove("Wrong");
          option.current.classList.remove("Correct");
          return null;
        })
       }
  }

const reset=() => {
  setIndex(0);
  setQuestion(data[0]);
  setScore(0);
  setLock(false);
  setResult(false);
}

  return (
    <div className='container'>
           <h1>Quiz App</h1>
           <hr/>
           {result?<></>:<>
            <h2>{index+1}. {question.question}</h2>
           <ul>
            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
           </ul>
           <button onClick={next}>Next</button>
           <div className="index">{index+1} of {data.length} Questions</div></>}
           {result?<>
            <h2>You Scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button>
           </>:<>
           </>}
           
    </div>
  )
}

export default Quiz