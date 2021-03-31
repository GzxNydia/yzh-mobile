import React, { CSSProperties, ReactNode } from 'react';
import classnames from 'classnames';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

export interface TextProps {
  /**
   * @description       字体大小
   */
  size?: number | string; //字体大小
  /**
   * @description       字体颜色
   */
  color?: string;
  /**
   * @description       行高
   */
  lineHeight?: string;
  /** 类名 */
  className?: string;
  weight?: any;
  style?: CSSProperties;
  children?: ReactNode;
}

function Text(props: TextProps) {
  const { className, style, size, color, lineHeight, weight, children } = props;
  const prefixCls = getPrefixCls('text');
  return (
    <span
      className={classnames(className, `${prefixCls}`)}
      style={{
        ...style,
        fontSize: `${size}px`,
        fontWeight: weight,
        color,
        lineHeight,
      }}
    >
      {children}
    </span>
  );
}

Text.defaultProps = {
  size: 14,
  color: '#333',
  lineHeight: 'normal',
  weight: 'initial',
};
Text.displayName = 'Text';
export default Text;
