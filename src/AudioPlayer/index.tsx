import React from 'react';
import classnames from 'classnames';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

export interface CellProps {
  autoPlay?: boolean;
  children?: React.ReactNode;
  className: string;
  controls: boolean;
  controlsList: string;
  crossOrigin: string;
  id: string;
  listenInterval: number;
  loop: boolean;
  muted: boolean;
  onAbort: Function;
  onCanPlay: Function;
  onCanPlayThrough: Function;
  onEnded: Function;
  onError: Function;
  onListen: Function;
  onLoadedMetadata: Function;
  onPause: Function;
  onPlay: Function;
  onSeeked: Function;
  onVolumeChanged: Function;
  preload: '' | 'none' | 'metadata' | 'auto';
  src: string; // Not required b/c can use <source>
  style: React.CSSProperties;
  title: string;
  volume: number;
}

// Cell默认属性
export const defaultProps = {
  autoPlay: false,
  children: null,
  className: '',
  controls: true,
  controlsList: '',
  crossOrigin: undefined,
  id: '',
  listenInterval: 10000,
  loop: false,
  muted: false,
  onAbort: () => {},

  preload: 'auto' as 'auto',
  src: undefined,
  style: {},
  title: 'qqqqqq',
  volume: 1.0,
};

const AudioPlayer: React.FC<Partial<CellProps>> = props => {
  const {
    autoPlay = false,
    children = null,
    className = '',
    controls = true,
    controlsList = '',
    crossOrigin = undefined,
    id = '',
    listenInterval = 10000,
    loop = false,
    muted = false,
    onAbort = () => {},
    onCanPlay = () => {},
    onCanPlayThrough = () => {},
    onEnded = () => {},
    onError = () => {},
    onListen = () => {},
    onPause = () => {},
    onPlay = () => {},
    onSeeked = () => {},
    onVolumeChanged = () => {},
    onLoadedMetadata = () => {},
    preload = 'auto',
    src = null,
    style = {},
    title = 'qqqqq',
    volume = 1.0,
  } = props;

  const prefixCls = getPrefixCls('audio');
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {}, []);

  return (
    <div style={style}>
      <audio
        autoPlay={autoPlay}
        className={`react-audio-player ${className}`}
        controls={controls}
        crossOrigin={crossOrigin}
        id={id}
        loop={loop}
        muted={muted}
        preload={preload}
        ref={audioRef}
        src={src ?? ''}
        style={{ width: '100%', height: '32px' }}
        title={title}
      >
        <div>你的浏览器暂不支持audio</div>
      </audio>
    </div>
  );
};

AudioPlayer.displayName = 'AudioPlayer';
AudioPlayer.defaultProps = defaultProps;

export default AudioPlayer;
