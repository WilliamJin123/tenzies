import Dice, {Die } from "./components/dice"
import { useEffect, useState } from "react"
import "./App.css"
import Confetti from "react-confetti"

export default function App() {
  const [diceList, setDiceList] = useState([...Array(10)].map(() => {
    let die = new Die();
    die.roll();
    return die;
  })) //10 dice
  const [buttonText, setButtonText] = useState("Roll")
  const [gameEnd, setGameEnd] = useState(false)
  const [rolls, setRolls] = useState(0)
  const [time, setTime] = useState(0)
  function allSame() {
    return diceList.every(die => die.value === diceList[0].value && die.freeze)
  }
  useEffect (() => {
    const end = allSame()
    setGameEnd(end);
    if (end) {
      setButtonText("New Game")
    }else{
      setButtonText("Roll")
    }
    
  }, [diceList])

  useEffect(() => {
    if(!gameEnd){
       const interval = setInterval(() => {
      setTime(prev => prev+1)
    }, 1000)
    return () => {clearInterval(interval)}
    }
   
  }, [time])
  return(
    <div className="main-body">
      {gameEnd && <Confetti />}

      <span className="score-sheet">
      Rolls: {rolls} <br/>
      Time taken: {time} {time === 1? 'second': 'seconds'}
      </span> 
      <div className="game-text">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die or use keyboard controls 
          (1-9, space / enter) to freeze it at its current value between rolls.
        </p>
      </div>
      <Dice

        diceList = {diceList}
        buttonText = {buttonText}
        setDiceList = {setDiceList}
        setButtonText = {setButtonText}
        gameEnd = {gameEnd}
        setGameEnd = {setGameEnd}
        rolls = {rolls}
        setRolls = {setRolls}
        time = {time}
        setTime = {setTime}
      />
    </div>
  )
}