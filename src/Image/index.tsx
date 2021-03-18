import React from 'react';
import classnames from 'classnames';
import { Icon } from 'yzh-mobile';
import { getPrefixCls } from '@/_utils/index';
import './style/index.less';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string; // 图片地址
  width?: number | string; // 图片宽度
  height?: number | string; // 图片高度
  round?: boolean; // 是否圆角
  radius?: number | string; // 圆角大小
  lazy?: boolean; // 是否懒加载
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'; // 填充模式
  errorIcon?: React.ReactNode | string; // 失败时提示图标
  onLoad?: (
    event: React.SyntheticEvent<HTMLImageElement, Event> | Event,
  ) => unknown;
  onError?: (
    event: React.SyntheticEvent<HTMLImageElement, Event> | Event,
  ) => unknown;
  onClick?: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent> | MouseEvent,
  ) => unknown;
  className?: string;
  style?: React.CSSProperties;
}

// Image默认属性
export const defaultProps = {
  errorIcon: 'photo-fail',
  onLoad: () => undefined,
  onError: () => undefined,
  onClick: () => undefined,
};

const Image: React.FC<ImageProps> = props => {
  const {
    src,
    width,
    height,
    round,
    radius,
    lazy,
    fit,
    errorIcon,
    onLoad: onPropsLoad,
    onError: onPropsError,
    onClick: onPropsClick,
    className,
    style,
    ...rest
  } = props;

  const prefixCls = getPrefixCls('img');

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  const boxSty: React.CSSProperties = {
    width,
    height,
    borderRadius: radius || (round ? '50%' : 0),
    ...style,
  };

  React.useEffect(() => {
    if (lazy) {
      if ('IntersectionObserver' in window) {
        const target: any = imgRef.current;
        let observer = new IntersectionObserver(entries => {
          entries.forEach(item => {
            if (item.isIntersecting) {
              let image = document.createElement('img');
              image.src = target.dataset.src;
              image.onload = onLoad;
              image.onerror = function(event: Event) {
                onError(event);
              } as any;
              image.onclick = onPropsClick as any;
              target.src = target.dataset.src;
              observer.unobserve(target);
              image = null as any;
            }
          });
        });
        observer.observe(target);
        return () => {
          observer = null as any;
        };
      } else {
        console.log('浏览器暂不支持IntersectionObserver属性，请用谷歌');
      }
    }
  }, []);

  const onLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event> | Event,
  ) => {
    console.log('111111');
    setLoading(false);
    onPropsLoad && onPropsLoad(event);
  };

  const onError = (
    event: React.SyntheticEvent<HTMLImageElement, Event> | Event,
  ) => {
    setLoading(false);
    setError(true);
    onPropsError && onPropsError(event);
  };

  const imgSty: React.CSSProperties = React.useMemo(() => {
    return {
      objectFit: fit,
      opacity: loading || error ? 0 : 1,
    };
  }, [loading, error]);

  const renderImage = React.useCallback(() => {
    if (lazy && 'IntersectionObserver' in window) {
      return <img ref={imgRef} data-src={src} style={imgSty} {...rest} />;
    }
    return (
      <img
        src={src}
        style={imgSty}
        {...rest}
        onLoad={onLoad}
        onError={onError}
        onClick={onPropsClick}
      />
    );
  }, [lazy, imgSty]);

  const renderPlaceholder = React.useCallback(() => {
    if (loading) {
      return (
        <div className={`${prefixCls}-placeholder`}>
          {/* <Loading type="spinner" size={20} /> */}
          loading...
        </div>
      );
    }
    if (error) {
      return (
        <div className={`${prefixCls}-placeholder`}>
          {typeof errorIcon === 'string' ? (
            <Icon type={errorIcon} size={32} color="#dcdee0" />
          ) : (
            errorIcon
          )}
        </div>
      );
    }
  }, [loading, error]);

  return (
    <div className={classnames(prefixCls, className)} style={boxSty}>
      {renderImage()}
      {renderPlaceholder()}
    </div>
  );
};

Image.displayName = 'Image';
Image.defaultProps = defaultProps;

export default Image;
