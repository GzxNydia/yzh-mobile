import React from 'react';
import { getPrefixCls } from '@/_utils/index';
import { formatPlaySecond } from '@/_utils/media';
import IconPlay from '@/assets/icon/icon_play.png';
import './style/index.less';

export interface VideoPlayerProps {
  url?: string;
}

// Cell默认属性
export const defaultProps = {};
interface State {
  playing: boolean;
  duration: number;
  current: number;
}

const VideoPlayer: React.FC<Partial<VideoPlayerProps>> = props => {
  const { url } = props;
  const [state, updateState] = React.useState<State>({
    playing: false,
    duration: 0,
    current: 0,
  });
  const videoRef = React.useRef<HTMLVideoElement>(null);
  console.log('url', url);

  const prefixCls = getPrefixCls('video');

  const togglePlayVideo = React.useCallback(() => {
    if (!videoRef.current) {
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
      updateState(pre => ({ ...pre, playing: true }));
    } else {
      videoRef.current.pause();
      updateState(pre => ({ ...pre, playing: false }));
    }
  }, []);

  return (
    <>
      <div className={`${prefixCls}`}>
        {!state.playing && url && (
          <img
            className={'play'}
            src={IconPlay}
            alt=""
            onClick={togglePlayVideo}
          />
        )}

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          ref={videoRef}
          playsInline
          src={url}
          onTimeUpdate={() =>
            updateState(pre => ({
              ...pre,
              current: (videoRef.current && videoRef.current.currentTime) || 0,
              duration: (videoRef.current && videoRef.current.duration) || 0,
            }))
          }
          onEnded={() => {
            updateState(pre => ({
              ...pre,
              playing: false,
            }));
          }}
          onLoadedData={() =>
            updateState(pre => ({
              ...pre,
              duration: (videoRef.current && videoRef.current.duration) || 0,
            }))
          }
        />
        <div className="current" onClick={togglePlayVideo}>
          <p>{formatPlaySecond(`${state.current}`)}</p>
          <p>/</p>
          <p>{formatPlaySecond(`${state.duration}`)}</p>
        </div>
      </div>
    </>
  );
};

VideoPlayer.displayName = 'VideoPlayer';
VideoPlayer.defaultProps = defaultProps;

export default VideoPlayer;
