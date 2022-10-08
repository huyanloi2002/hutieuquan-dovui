import React, { useState } from 'react';
import logomain from '../assets/logomains.gif'
import { useNavigate } from "react-router-dom";
// import soundtrackGame from '../assets/music/soundtrack-game.mp3'

const Home = ({ userPlay, setUserPlay }) => {
    const navigate = useNavigate();
    const [isActiveInput, setActiveInput] = useState(false)

    // const [soundTrack] = useSound(soundtrackGame, { interrupt: true });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userPlay) {
            localStorage.setItem('user', JSON.stringify(userPlay))
            navigate('/play')
        } else {
            alert('Please enter a username')
        }
    }
    const handleChange = (e) => {
        setUserPlay(e.target.value)
        setActiveInput(true)
    }
    
    return (
        <div className="home">
            <div className="content-home">
                <div className="logo-main">
                    <img src={logomain} alt="" />
                </div>
                <div className="input-play">
                    <form onSubmit={handleSubmit}>
                        <label className="label-user"><h6><b>Tên của quý khách: </b></h6></label>
                        <input
                            className={isActiveInput === true ? "input-user active" : "input-user"}
                            type="text"
                            value={userPlay}
                            onChange={(e) => handleChange(e)}
                        />
                        <button className="btn-main" >Gét gô</button>
                    </form>
                </div>
                {/* <div className="history">
                    HISTORY
                </div> */}
            </div>
        </div>
    )
}

export default Home