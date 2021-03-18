import React from 'react';
import classnames from 'classnames';
import { Icon } from 'yzh-mobile';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

export interface CellProps {
  title?: React.ReactNode; // 左侧标题
  label?: React.ReactNode; // 描述信息
  clickable?: boolean; // 是否开启点击反馈
  arrow?: 'left' | 'up' | 'right' | 'down' | 'none'; // 箭头方向
  center?: boolean; // 内容是否居中
  ripple?: boolean; // 是否开启水波纹效果
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children?: React.ReactNode;
  wrapClassName?: string;
  style?: React.CSSProperties;
}

// Cell默认属性
export const defaultProps = {
  clickable: false,
  arrow: 'none' as 'none',
  center: false,
  ripple: false,
  onClick: () => undefined,
};

const Cell: React.FC<CellProps> = props => {
  const {
    title,
    label,
    clickable,
    arrow,
    center,
    ripple,
    children,
    onClick,
    wrapClassName = '',
    style,
  } = props;

  const prefixCls = getPrefixCls('cell');

  return (
    <div
      className={classnames({
        [prefixCls]: true,
        [wrapClassName]: wrapClassName,
        [`${prefixCls}-center`]: center,
        [`${prefixCls}-clickable`]: clickable,
      })}
      style={style}
      onClick={onClick}
    >
      <div className={`${prefixCls}-title`}>
        <div>{title}</div>
        {label !== undefined && (
          <div className={`${prefixCls}-label`}>{label}</div>
        )}
      </div>
      <div className={`${prefixCls}-value ellipsis`}>{children}</div>
      {arrow !== 'none' && (
        <Icon className="arrow-icon" type={`arrow-${arrow}`} />
      )}
    </div>
  );
};

Cell.displayName = 'Button';
Cell.defaultProps = defaultProps;

export default Cell;
