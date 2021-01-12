import './GameSelect.css'
import logo from '../assets/img/main-logo.png'


function GameSelect() {
  return (
    <div className='game-select'>
        <img className='game-select__image' src={logo}></img>
        <div className='game-select__content'>
              <button className='game-select-content__button'>New Game</button>
              <button className='game-select-content__button'>Join Game</button>
        </div>
    </div>
    
  );
}

export default GameSelect;
