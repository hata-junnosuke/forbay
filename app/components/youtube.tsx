'use client'
import React from 'react';
import Youtube from 'react-youtube';

type Song =  {
  start: number | null,
  end: number | null,
}

interface RefreshBtnProps {
  song: Song,
}

function YoutubePlayer({song}: RefreshBtnProps){
  const opts = {
    playerVars: {
      start: song.start, // 再生開始時間（秒）
      end: song.end // 再生終了時間（秒）
    }
  }

  return (
    <Youtube
      videoId="FlQLysOzMBc"
      opts={opts}
    />
  )
}

export default YoutubePlayer;
