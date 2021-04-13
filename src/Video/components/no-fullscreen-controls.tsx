import React, { useState, useEffect, useRef } from 'react';
import { Icon, VideoTypes } from '../constant';
import {
  formatDuraton,
  getClient,
  getEleRelativeScreenPosition,
} from '@/_utils/media';
import './control.less';

interface NoFullscreenControlsProps {
  /** 样式相关 */
  progressColor?: string;
  progressBackColor?: string;
  thumb?: string;
  pauseBtn?: string;
  playBtn?: string;
  timeStyle?: Record<string, any>;
  fullScreenBtn?: string;

  videoState: string;
  currentTime: number;
  duration: number;
  isFullScreen: boolean;
  dispatch: any;
  operation: {
    setVolume: (value: number) => void;
    handleTogglePlay: () => void;
    handleFullScreen: () => void;
    handleVideoPlay: () => void;
    handleVideoPause: () => void;
  };
}

export const NoFullscreenControls: React.FC<NoFullscreenControlsProps> = props => {
  const {
    videoState,
    currentTime,
    duration,
    dispatch,
    isFullScreen,
    operation,
    progressColor,
    progressBackColor,
    thumb,
    timeStyle,
    fullScreenBtn,
  } = props;
  const [percent, setPercent] = useState<number>(0);
  const [volumePercent, setVolumePercent] = useState<number>(100);
  const [visibleVolumeControl, setVisibleVolumeControl] = useState<boolean>(
    false,
  );
  const progressLockRef = useRef<boolean>(true);
  const volumeLockRef = useRef<boolean>(true);

  const showplay =
    videoState === 'pause' || videoState === 'null' || videoState === 'error';

  useEffect(() => {
    if (currentTime && duration) {
      const p = Math.floor((currentTime / duration) * 100);
      setPercent(p);
    }
  }, [currentTime, duration]);

  useEffect(() => {
    operation.setVolume(volumePercent / 100);
  }, [operation, volumePercent]);

  useEffect(() => {
    const bodyClickListener = (e: Event) => {
      setVisibleVolumeControl(false);
    };

    document
      .getElementById('video-container')
      ?.addEventListener('click', bodyClickListener, false);

    return () => {
      document
        .getElementById('video-container')
        ?.removeEventListener('click', bodyClickListener);
    };
  }, []);

  /**
   * 音量控制
   */
  useEffect(() => {
    const mouseMoveListener = (event: any) => {
      if (volumeLockRef.current) return;
      const client = getClient(event);
      if (!client) return;
      const { clientY } = client;
      const elePosition = getEleRelativeScreenPosition('progressVolume');
      if (!elePosition) return;

      const { eleHeight, eleBorderTop, eleBorderBottom } = elePosition;
      if (clientY >= eleBorderBottom) {
        setVolumePercent(0);
      } else if (clientY <= eleBorderTop) {
        setVolumePercent(100);
      } else {
        const percent = (eleBorderBottom - clientY) / eleHeight;
        setVolumePercent(Math.floor(percent * 100));
      }
    };

    window.addEventListener('mousemove', mouseMoveListener, false);
    window.addEventListener('touchmove', mouseMoveListener, false);

    return () => {
      window.removeEventListener('mousemove', mouseMoveListener);
      window.removeEventListener('touchmove', mouseMoveListener, false);
    };
  }, []);

  const handleMouseDownProgress = () => {
    console.log('handle mouse down progress');
    progressLockRef.current = false;
    operation.handleVideoPause();
  };

  const handleMouseDownVolume = () => {
    volumeLockRef.current = false;
  };

  const toggleVolumeControl = () => {
    setVisibleVolumeControl(prev => !prev);
  };

  const volumeStyle = {
    width: '38px',
    height: '38px',
    background: `url(${Icon.volume}) center center no-repeat`,
  };

  const volumeBarStyle = {
    backgroundSize: `${volumePercent}% 100%`,
  };

  const progressStyle = {
    display: 'flex',
  };

  return (
    <div className="no-full-screen-container">
      <div
        className="play-pause"
        onClick={() => {
          operation.handleTogglePlay();
        }}
      >
        <img src={showplay ? Icon.playCtrl : Icon.pauseCtrl} alt="" />
      </div>
      <span className="time left" style={timeStyle}>
        {formatDuraton(currentTime)}
      </span>
      {/* 进度条 */}
      <div id="progress" className="progress" style={progressStyle}>
        <div className="fake_bar">
          <div
            style={{
              background: `linear-gradient(to right, ${progressColor ??
                '#FFE435'} 0%,${progressColor ??
                '#FFE435'} ${percent}%, ${progressBackColor ??
                '#0A002A'} ${percent}%,${progressBackColor ?? '#0A002A'} 100%)`,
            }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={percent >> 0}
          step="1"
          onMouseDown={e => {
            operation.handleVideoPause();
          }}
          onMouseUp={e => {
            operation.handleVideoPlay();
          }}
          onTouchStart={e => {
            operation.handleVideoPause();
          }}
          onTouchEnd={e => {
            operation.handleVideoPlay();
          }}
          onChange={e => {
            e.preventDefault();
            e.stopPropagation();
            const time = Math.floor(
              duration * (Number.parseInt(e.target.value) / 100),
            );
            dispatch({ type: VideoTypes.PAUSE });
            dispatch({
              type: VideoTypes.MODIFY,
              payload: { currentTime: time },
            });
          }}
        />
      </div>
      <span className="time right" style={timeStyle}>
        {formatDuraton(duration)}
      </span>
      {/* 音量控制 */}
      <div
        className="volume"
        id="videoVolume"
        onClick={e => {
          e.stopPropagation();
          toggleVolumeControl();
        }}
      >
        <div style={volumeStyle} />
        {visibleVolumeControl && (
          <input
            type="range"
            value={volumePercent}
            min="0"
            max="100"
            onChange={e => {
              setVolumePercent(Number.parseInt(e.target.value));
            }}
            style={{
              position: 'absolute',
              transform: 'rotate(-90deg)',
              width: 80,
              bottom: '200%',
              left: '-62%',
              ...volumeBarStyle,
            }}
          />
        )}
      </div>
      {isFullScreen ? (
        <div className="fullscreenBtn" onClick={operation.handleFullScreen}>
          <img src={fullScreenBtn ?? Icon.quitFullscreen} alt="" />
        </div>
      ) : (
        <div className="fullscreenBtn" onClick={operation.handleFullScreen}>
          <img src={fullScreenBtn ?? Icon.entryFullscreen} alt="" />
        </div>
      )}
    </div>
  );
};
