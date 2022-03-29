import React from 'react';
import { observer } from 'mobx-react-lite';
import musicList from './musicList/MusicList';

const App = observer(({ store }) => {

  return (
    <div className='wrapper'>

      <div className='top-bar'>
        <i className='material-icons'>expand_more</i>
        <span>Now Playing</span>
        <i className="material-icons">more_horiz</i>
      </div>

      <div className='img-area'>
        <img
          src={require(`./assets/music-${store.musicIndex}.jpg`).default}
          alt='doesnt works'
        />
      </div>

      <div className='song-details'>
        <p className='name'>
          {store.loadMusic(store.musicIndex)[0]}
        </p>
        <p className='artist'>
          {store.loadMusic(store.musicIndex)[1]}
        </p>
      </div>

      {/* AUDİO */}
      <div className='progress-area'>
        <div
          className='progress-bar'
          style={{ width: `${store.progressWidth}% ` }}
          onLoadStart={store.displaySongCurrentTime}>
          <audio
            id='main-audio'
            src={require(`./songs/music-${store.musicIndex}.mp3`).default}
            onLoadStart={store.timeUpdate}
            onEnded={store.checkRepeatState}>
          </audio>
        </div>

        <div className="song-timer">
          <span className="current-time">{store.musicCurrentTime}</span>
          <span className="max-duration">{store.musicDurationTime}</span>
        </div>
      </div>

      <div className='controls'>

        {/*this audio tag implemented for just access other tag --> #repeat-list */}
        <audio src="" onLoadStart={store.checkRepeatInnerText}></audio>

        <i
          id='repet-list'
          className='material-icons'
          title='Playlist looped'>
          repeat
        </i>

        <i
          id='prev'
          className='material-icons'
          title='Playlist looped'
          onClick={store.prevMusic}>
          skip_previous
        </i>

        {/* PLAY PAUSE BUTTON */}
        <div className='play-pause'>
          <i
            className='material-icons play'
            onClick={store.playPauseButtonCheck}>
            {store.mediaPlayerIcon}
          </i>
        </div>

        <i
          id="next"
          className="material-icons"
          onClick={store.nextMusic} >skip_next
        </i>

        {/*this audio tag implemented for just access other tags*/}
        <audio src="" onLoadStart={store.getShowMusicListBtn}></audio>

        <i
          id="more-music"
          className="material-icons">
          queue_music
        </i>

      </div>

      {/* SHOW MORE - MUSIC LIST*/}
      <div className='music-list' >

        {/*this audio tag implemented for just access other tags*/}
        <audio src="" onLoadStart={store.getMusicList}></audio >

        <div className='header'>
          <div className='row'>
            <i className='list material-icons'>queue_music</i>
            <span>Music List</span>
          </div>
          <i
            id='close'
            className='material-icons'
            onClick={store.hideMusicList}>
            close
          </i>
        </div>

        <ul>
          {musicList}
        </ul>

      </div>
    </div>
  )
})

export default App;