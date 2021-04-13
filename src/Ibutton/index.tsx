import * as React from 'react';
import classNames from 'classnames';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

export type ButtonType =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'link';
export type ButtonSize = 'xs' | 'sm' | 'lg' | 'xl';
export interface BaseButtonProps {
  classPrefix: string;
  children: React.ReactNode;
  href?: string;
  /**按钮类型 */
  btnType?: ButtonType;
  /**设置 Button 的尺寸 */
  size?: ButtonSize | null;
  hollow?: boolean;
  block?: boolean;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  className?: string | null;
  loading?: boolean;
  circle?: boolean;
}
// 获取button和a的原生属性
type NativeButtonAttributes = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type NativeAnchorAttributes = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<
  NativeButtonAttributes & NativeAnchorAttributes
>;
export const Button: React.FC<ButtonProps> = props => {
  const {
    disabled,
    size,
    btnType,
    children,
    href,
    classPrefix,
    hollow,
    block,
    loading,
    className,
    circle,
    ...restProps
  } = props;

  const prefixCls = getPrefixCls('btn', classPrefix);
  const classes = classNames(classPrefix, className, {
    [`${prefixCls}-${btnType}`]: btnType,
    [`${prefixCls}-${size}`]: !!size,
    [`disabled`]: href && disabled,
    [`${prefixCls}-hollow`]: hollow,
    [`${prefixCls}-block`]: block,
    [`${prefixCls}-circle`]: circle,
  });

  if (href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {loading && 'loading'}
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  classPrefix: 'btn',
  btnType: 'default',
};
Button.displayName = 'Button';
export default Button;
