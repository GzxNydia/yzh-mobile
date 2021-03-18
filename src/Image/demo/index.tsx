import React from 'react';
import { Image } from 'yzh-mobile';
import styles from './index.less';

const fitList = ['contain', 'cover', 'fill', 'none', 'scale-down'];
const img = 'http://via.placeholder.com/400X400/f60/fff?text=yzh-mobile';
const arr = new Array(10).fill(true);
const colors = [
  'f60',
  '5c2223',
  'eea2a4',
  '5a1216',
  'ed556a',
  '8076a3',
  'e2e1e4',
  '2f2f35',
  '93b5cf',
  '1772b4',
];
const tips: Array<{ props: any; text: string }> = [
  {
    props: {},
    text: '加载中',
  },
  {
    props: { src: 'img', onError: () => console.log('图片加载失败') },
    text: '加载失败',
  },
];

const ImageDemo: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>基础用法</div>
      <div className={styles.list}>
        <Image src={img} onLoad={() => console.log('加载成功')} />
      </div>

      <div className={styles.title}>填充模式</div>
      <div className={styles.list}>
        {fitList.map(item => (
          <div key={item} className={styles.item}>
            <Image className={styles.haveBorder} src={img} fit={item} />
            <div className="text">{item}</div>
          </div>
        ))}
      </div>

      <div className={styles.title}>图片懒加载</div>
      <div className={styles.lazyList}>
        {arr.map((item, index) => (
          <Image
            key={index}
            lazy
            src={`http://via.placeholder.com/400X400/${colors[index]}/fff?text=yzh-mobile'`}
          />
        ))}
      </div>
      <div className={styles.lazyListH}>
        {arr.map((item, index) => (
          <Image
            key={index}
            lazy
            src={`http://via.placeholder.com/400X400/${colors[index]}/fff?text=yzh-mobile'`}
            style={{ flexShrink: 0 }}
          />
        ))}
      </div>

      <div className={styles.title}>加载提示</div>
      <div className={styles.list}>
        {tips.map(item => (
          <div key={item.text} className={styles.item}>
            <Image {...item.props} />
            <div className="text">{item.text}</div>
          </div>
        ))}
      </div>

      <div className={styles.title}>自定义提示</div>
      <div className={styles.list}>
        <Image src="img" errorIcon={<div>加载失败</div>} />
      </div>

      <div className={styles.title}>圆形图片</div>
      <div className={styles.list}>
        <div className={styles.item}>
          <Image src={img} round />
          <div className="text">round</div>
        </div>
        <div className={styles.item}>
          <Image src={img} radius={5} />
          <div className="text">自定义radius</div>
        </div>
      </div>
    </div>
  );
};

export default ImageDemo;
