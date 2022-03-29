import React from "react";
import allMusic from "../musicsDB/AllMusic";

const musicList = allMusic.map((music, i) => {
    return (
        <li key={i}>
            <div className='row'>
                <span>{music.name}</span>
                <p>{music.artist}</p>
            </div>
            <span id={`${music.src}`} className="audio-duration"></span>
        </li>
    )
})

export default musicList;