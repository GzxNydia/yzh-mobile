import React, { useEffect, useRef, useReducer, useState } from 'react';
import classname from 'classnames';
import { NoFullscreenControls } from './components/no-fullscreen-controls';
import { VideoWrapper } from './components/video-wrapper';
import { BottomProgress } from './components/bottom-progress';
import {
  VideoPlayerState,
  VideoPlayerProps,
  VideoActionTypes,
  VideoTypes,
} from './constant';
import './index.less';

const initialState: VideoPlayerState = {
  videoState: 'null',
  currentTime: 0,
  duration: 0,
  fullScreen: false,
};

const reducer = (
  state: VideoPlayerState,
  action: VideoActionTypes,
): VideoPlayerState => {
  switch (action.type) {
    case VideoTypes.PLAY:
      return { ...state, videoState: 'play' };
    case VideoTypes.PAUSE:
      return { ...state, videoState: 'pause' };
    case VideoTypes.MODIFY:
      return { ...state, ...action.payload };
    case VideoTypes.ENTRYFULLSCREEN:
      return { ...state, fullScreen: true };
    case VideoTypes.QUITFULLSCREEN:
      return { ...state, fullScreen: false };
    default:
      throw new Error();
  }
};

const VideoPlayer: React.FC<VideoPlayerProps> = (props: VideoPlayerProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { videoState, currentTime, duration, fullScreen } = state;
  const [visibleCustomCtrl, setVisibleCustomCtrl] = useState<boolean>(false);
  const [fadeEntry, setFadeEntry] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout>>(null);

  const {
    src,
    poster,
    preload = 'auto',
    autoPlay = false,
    muted = false,
    loop = false,
    progressColor,
    progressBackColor,
    thumb,
    timeStyle,
    fullScreenBtn,
    pauseBtn,
    playBtn,
    loading,
    onAbort,
    onCanplay,
    onCanPlaythrough,
    onDurationchange,
    onEmptied,
    onEnded,
    onError,
    onLoadedmetadata,
    onLoadstart,
    onPause,
    onPlay,
    onPlaying,
    onProgress,
    onRateChange,
    onSeeked,
    onSeeking,
    onStalled,
    onSuspend,
    onTimeupdate,
    onVolumechange,
    onWaiting,
    showCenterBtn = true,
    showController = true,
    showBottomProgress = true,
    videoRef: Ref,
  } = props;

  useEffect(() => {
    const timeupdateListener = () => {
      const currentTime = videoRef.current?.currentTime;
      dispatch({
        type: VideoTypes.MODIFY,
        payload: { currentTime: currentTime },
      });
    };
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', timeupdateListener);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', timeupdateListener);
      }
    };
  }, []);

  useEffect(() => {
    Ref && (Ref.current = videoRef.current);
  }, [videoRef.current]);

  useEffect(() => {
    if (videoState === 'null') {
      setVisibleCustomCtrl(false);
    } else {
      setVisibleCustomCtrl(true);
    }
  }, [videoState]);

  useEffect(() => {
    if (videoRef.current && videoState === 'pause') {
      videoRef.current.currentTime = currentTime;
    }
  }, [currentTime, videoState]);

  const handleTogglePlay = async () => {
    if (videoRef.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  };

  const handleLoaded = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      dispatch({ type: VideoTypes.MODIFY, payload: { duration: duration } });
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      dispatch({ type: VideoTypes.MODIFY, payload: { videoState: 'play' } });
    }
    if (fadeTimer.current) {
      clearTimeout(fadeTimer.current);
    }
    //@ts-ignore
    fadeTimer.current = setTimeout(() => {
      setFadeEntry(false);
    }, 1500);
  };

  const handlePause = () => {
    if (videoRef.current) {
      dispatch({ type: VideoTypes.MODIFY, payload: { videoState: 'pause' } });
    }
    if (fadeTimer.current) {
      clearTimeout(fadeTimer.current);
    }
    setFadeEntry(true);
  };

  const handleWaiting = () => {
    if (videoRef.current) {
      dispatch({ type: VideoTypes.MODIFY, payload: { videoState: 'waiting' } });
    }
    setFadeEntry(true);
  };

  const handleError = () => {
    if (videoRef.current) {
      dispatch({ type: VideoTypes.MODIFY, payload: { videoState: 'error' } });
    }
  };

  const handleFullScreen = () => {
    const container = document.getElementById('video-container');
    if (!container) return;

    if (videoRef.current) {
      const videoCur = videoRef.current as any;
      if (videoCur.requestFullscreen) {
        videoCur.requestFullscreen();
      } else if (videoCur.mozRequestFullScreen) {
        videoCur.mozRequestFullScreen();
      } else if (videoCur.webkitRequestFullscreen) {
        videoCur.webkitRequestFullscreen();
      } else if (videoCur.msRequestFullscreen) {
        videoCur.msRequestFullscreen();
      } else if (videoCur.webkitEnterFullScreen) {
        videoCur.webkitEnterFullScreen();
      }
    }

    dispatch({ type: VideoTypes.ENTRYFULLSCREEN });
  };

  const handleVideoPause = () => {
    videoRef.current && videoRef.current.pause();
  };

  const handleVideoPlay = () => {
    videoRef.current && videoRef.current.play();
  };

  const handleScreenClick = () => {
    if (videoState === 'null') return;
    if (fadeEntry) {
      setFadeEntry(false);
    } else {
      setFadeEntry(true);
      if (fadeTimer.current) {
        clearTimeout(fadeTimer.current);
      }
    }
  };

  const operation = {
    setVolume: (value: number) => {
      if (!videoRef.current || value < 0 || value > 1) return;
      videoRef.current.volume = value;
    },
    handleTogglePlay,
    handleFullScreen,
    handleVideoPause,
    handleVideoPlay,
  };

  const videoContainerFullscreenStyle = {
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    background: 'black',
  } as React.CSSProperties;

  const videoFullscreenStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <>
      <div
        id="video-container"
        className="video-conatiner"
        style={fullScreen ? videoContainerFullscreenStyle : {}}
        onClick={handleScreenClick}
      >
        <video
          id="video"
          className="video"
          style={fullScreen ? videoFullscreenStyle : {}}
          ref={videoRef}
          src={src}
          poster={poster}
          width="100%"
          preload={preload}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          // @ts-ignore
          playsInline={fullScreen ? '' : 'isiPhoneShowPlaysinline'}
          webkit-playsinline="true" /* 这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放 */
          x-webkit-airplay="allow"
          x5-video-player-type="h5-page" // 启用H5播放器,是wechat安卓版特性
          // x5-video-player-fullscreen="true" // 全屏设置，设置为 true 是防止横屏
          x5-video-orientation="landscape" // 播放器的方向， landscape横屏，portraint竖屏，默认值为竖屏
          raw-controls="false" //钉钉webview播放器
          // crossOrigin="anonymous"
          onDurationChange={e => {
            handleLoaded();
            onDurationchange && onDurationchange(e);
          }}
          onWaiting={e => {
            handleWaiting();
            onWaiting && onWaiting(e);
          }}
          onPlaying={e => {
            handlePlay();
            onPlaying && onPlaying(e);
          }}
          onPause={e => {
            handlePause();
            onPause && onPause(e);
          }}
          onError={e => {
            handleError();
            onError && onError(e);
          }}
          onAbort={onAbort}
          onCanPlay={onCanplay}
          onCanPlayThrough={onCanPlaythrough}
          onEmptied={onEmptied}
          onEnded={onEnded}
          onLoadedMetadata={onLoadedmetadata}
          onLoadStart={onLoadstart}
          onPlay={onPlay}
          onProgress={onProgress}
          onRateChange={onRateChange}
          onSeeked={onSeeked}
          onSeeking={onSeeking}
          onStalled={onStalled}
          onSuspend={onSuspend}
          onTimeUpdate={onTimeupdate}
          onVolumeChange={onVolumechange}
        />
        {showController && visibleCustomCtrl && (
          <div
            className={classname(
              'control-container',
              fadeEntry ? 'control-in' : 'control-out',
              'fade-enter-active',
            )}
          >
            <NoFullscreenControls
              progressColor={progressColor}
              progressBackColor={progressBackColor}
              thumb={thumb}
              timeStyle={timeStyle}
              fullScreenBtn={fullScreenBtn}
              videoState={videoState}
              currentTime={state.currentTime}
              duration={state.duration}
              operation={operation}
              isFullScreen={state.fullScreen}
              dispatch={dispatch}
            />
          </div>
        )}
        {showBottomProgress && !fadeEntry && (
          <div
            className={classname(
              'control-container',
              !fadeEntry ? 'control-in' : 'control-out',
              'fade-enter-active',
            )}
          >
            <BottomProgress
              currentTime={state.currentTime}
              duration={state.duration}
              progressColor={progressColor}
              progressBackColor={progressBackColor}
            />
          </div>
        )}
        {showCenterBtn && (
          <div
            className={classname(
              'fade-leave-active',
              fadeEntry ? 'wrapper-in' : 'wrapper-out',
            )}
          >
            <VideoWrapper
              playBtn={playBtn}
              pauseBtn={pauseBtn}
              loading={loading}
              videoState={videoState}
              operation={operation}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default VideoPlayer;
