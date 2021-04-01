import React, { Children } from 'react';
import HornIcon from '../Icon';
import classnames from 'classnames';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

interface NoticeBarProps {
  /** 显示图标 */
  showIcon?: boolean;
  /** 背景颜色 */
  bgcolor?: string;
  /** 颜色 */
  color?: string;
  /** 公告内容 */
  notice?: string;
  /** 滚动速度 */
  speed?: number;
  /** 延迟时间 */
  delay?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const NoticeBar = (props: NoticeBarProps) => {
  const {
    style,
    notice = '',
    bgcolor = '#FEF6E2',
    color = '#F3235C',
    showIcon = true,
    speed = 50,
    delay = 2000,
    children,
  } = props;
  const noticeRef = React.useRef<HTMLDivElement>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const [animationDuration, setAnimationDuration] = React.useState<number>(0);
  const [isScroll, setIsScroll] = React.useState<boolean>(false);

  const prefixCls = getPrefixCls('noticeBar');

  React.useEffect(() => {
    const wrapWidth = wrapRef.current?.getBoundingClientRect().width ?? 350;
    const noticeWidth = noticeRef.current?.getBoundingClientRect().width ?? 0;

    if (noticeWidth > wrapWidth) {
      const duration = Math.round(delay * 2 + (noticeWidth / speed) * 1000);

      setAnimationDuration(duration);
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  }, [delay, speed]);

  const animationEnd = React.useCallback(() => {}, []);

  const animationIteration = React.useCallback(() => {}, []);

  const barStyle = {
    color,
    backgroundColor: bgcolor,
    ...style,
  };

  const contentStyle = React.useMemo(() => {
    return animationDuration > 0
      ? {
          animationDuration: `${animationDuration}ms`,
        }
      : undefined;
  }, [animationDuration]);

  return (
    <div className={prefixCls} style={barStyle}>
      {showIcon && <HornIcon size={16} color={color} type="volume-o" />}
      <div className="noticeWrap" ref={wrapRef}>
        <div
          ref={noticeRef}
          className={classnames('noticeContent', {
            ['notice-bar__play--infinite']: isScroll,
          })}
          style={contentStyle}
          onAnimationEnd={animationEnd}
          onAnimationIteration={animationIteration}
        >
          {notice || children}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NoticeBar);
