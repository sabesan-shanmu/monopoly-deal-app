import React,{useState,useEffect} from 'react';
import MainThemeSong from '../../assets/audio/monopoly-theme.mp3'
import MusicOnImg from  '../../assets/img/music-on.png'
import MusicOffImg from  '../../assets/img/music-off.png'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const StyledAudioPlayer = styled.img`
    padding:10px;
`;


export const AudioPlayer = ({isPlaying})=> {
    
    
    const getAudioObj = () =>{
        const audioObj = new Audio(MainThemeSong);
        audioObj.loop=true;
        return audioObj;
    }


    const togglePlay = () =>{
        if(playMode)
            audio.play();
        else
            audio.pause();
    }

    
    const [audio] = useState(getAudioObj());
    const [playMode, setPlayMode] = useState(isPlaying);
    
    

    togglePlay();
    return (
        <StyledAudioPlayer src={playMode?MusicOnImg:MusicOffImg} onClick={()=>setPlayMode(!playMode)} />
    )
}


AudioPlayer.propTypes = {
    isPlaying:PropTypes.bool,
  };
  
AudioPlayer.defaultProps = {
    isPlaying:false
};
