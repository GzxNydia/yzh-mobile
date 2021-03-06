import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { Icon } from '../index';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

export interface NavBarProps {
  title?: ReactNode; // 标题
  left?: ReactNode; // 左边节点
  right?: ReactNode; // 右边节点
  border?: boolean; // 是否显示下边框
  fixed?: boolean; // 是否固定到顶部
  className?: string;
  style?: CSSProperties;
  zIndex?: number;
  leftArrow?: boolean;
  placeholder?: boolean; // 固定在顶部时，是否在标签位置生成一个等高的占位元素
  onClickLeft?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onClickRight?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const NavBar: React.FC<NavBarProps> = props => {
  const {
    title,
    left,
    right,
    className = '',
    style,
    border,
    fixed,
    zIndex,
    leftArrow,
    placeholder,
  } = props;

  const box = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(47);
  const prefixCls = getPrefixCls('navbar');

  useEffect(() => {
    setHeight(box.current!.offsetHeight);
  }, []);

  return (
    <div>
      <div
        ref={box}
        className={classnames({
          [className]: className,
          [prefixCls]: true,
          fixed: fixed,
        })}
        style={{ ...style, zIndex: zIndex }}
      >
        <div className="navbar-left" onClick={props.onClickLeft}>
          {leftArrow && <Icon type="arrow-left" style={{ marginRight: 4 }} />}
          {left}
        </div>
        <div className="sty-ellipsis navbar-title">{title}</div>
        <div className="navbar-right" onClick={props.onClickRight}>
          {right}
        </div>
      </div>
      {fixed && placeholder && <div style={{ height: height }} />}
    </div>
  );
};

NavBar.defaultProps = {
  title: '标题',
  onClickLeft: () => {},
  onClickRight: () => {},
};

export default NavBar;
