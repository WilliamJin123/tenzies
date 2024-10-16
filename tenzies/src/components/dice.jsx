import "./dice.css"
import { useState, useEffect } from "react"

export class Die{
    constructor(value = 1, sides = 6, freeze = false, roll = false){
        this.sides = sides;
        this.value = value;
        this.freeze = freeze;
    }
    roll(){
        this.value = Math.floor(Math.random() * this.sides) + 1;
        return this.value;
    }
  }

export default function Dice({buttonText, diceList, setDiceList, setButtonText, gameEnd, setGameEnd}) {
    

    const displayDice = diceList.map((die, dieIndex) => (
        <div className = "dice-square-div">
            <p className="label">{dieIndex !== 9 ? dieIndex+1 : 0}</p>
        <button 
            className= {`dice-square ${die.freeze? 'frozen' : 'unfrozen'}`} 
            key = {dieIndex} 
            onClick={() => lockDie(dieIndex)}
            // onKeyDown={handleKeyDown}
        >
            {die.value}
        </button>
        </div>
        

    ))


    const useKeyPress = (lockCallback, rollCallback) => {
        useEffect(() => {
            const handleKeyDown = (event) => {
                const key = event.key;
                const intKey = parseInt(key);
                const index = intKey > 0 ? intKey - 1 : (diceList.length + (intKey - 1)) % diceList.length; // Adjust for 0-based index
                console.log(index);
                if(!Number.isNaN(index)){
                    lockCallback(index);
                }
                   
                
                if (key === 'Enter' || key === ' ') {
                    rollCallback();
                }
            };

            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [diceList, lockCallback, rollCallback]);
    };

    // function handleKeyDown(event){
    //     const key = event.key;
    //     const index = parseInt(key, 10);
    //     console.log(index);
    //     if (index >= 1 && index < diceList.length){
    //         lockDie(index-1);
    //     }
    // }

    useKeyPress(lockDie, gameEnd? resetDice: rollDice);
    function lockDie(index) {

        setDiceList(
            diceList.map((die, dieIndex) => (
                dieIndex === index? new Die(die.value, die.sides, !die.freeze) : die
                
            ))

            )
    }

    function rollDice() {
        setDiceList(
            diceList.map(die => (
                die.freeze? die : new Die(die.roll(), die.sides, die.freeze)
            ))
        );
    }

    function resetDice() {
        setGameEnd(false)
        setDiceList(
            diceList.map(() => {
                let die = new Die();
                die.roll();
                return die;
            }
               
            )
        )
    }
    
    return(
        <div className = "button-area" >
            <div className="dice-area">
                {displayDice}
            </div>
            <div className="roll-area">
                <button className="roll-button" onClick={gameEnd? resetDice : rollDice}>
                    {buttonText}
                </button>
            </div>

        </div>
    )
}