import React, { CSSProperties } from 'react';
import classnames from 'classnames';
import { getPrefixCls } from '@/_utils/index';
import './index.less';

export interface IconProps {
  size?: number | string;
  color?: string;
  type?: string;
  onClick?: () => unknown;
  className?: string;
  style?: CSSProperties;
}

function Icon(props: IconProps) {
  const { className, style, size, color, type, onClick } = props;
  const prefixCls = getPrefixCls('icon');
  return (
    <i
      className={classnames(className, `${prefixCls}`, `${prefixCls}-${type}`)}
      style={{ ...style, fontSize: size, color: color }}
      onClick={onClick}
    />
  );
}

Icon.defaultProps = {
  onClick: () => undefined,
};
Icon.displayName = 'Icon';
export default Icon;
