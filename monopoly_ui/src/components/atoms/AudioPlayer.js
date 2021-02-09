import React,{useState,useEffect} from 'react';
import './AudioPlayer.css'
import MainThemeSong from '../../assets/audio/monopoly-theme.mp3'
import MusicOnImg from  '../../assets/img/music-on.png'
import MusicOffImg from  '../../assets/img/music-off.png'
import PropTypes from 'prop-types'

export const AudioPlayer = ({isPlaying})=> {
    console.log(isPlaying)
    const [audio] = useState(new Audio(MainThemeSong));
    const [playMode, setPlayMode] = useState(isPlaying);
    
    
    const togglePlay = () =>{
        if(playMode)
            audio.play();
        else
            audio.pause();
    }


    togglePlay();
    return (
        <img className="audio-player-image" src={playMode?MusicOnImg:MusicOffImg} onClick={()=>setPlayMode(!playMode)} />
    )
}


AudioPlayer.propTypes = {
    isPlaying:PropTypes.bool,
  };
  
AudioPlayer.defaultProps = {
    isPlaying:false
};
