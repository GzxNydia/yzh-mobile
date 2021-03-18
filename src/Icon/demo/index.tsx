import React from 'react';
import { Icon } from 'yzh-mobile';
import styles from './index.less';
import data from './data';

const IconDemo: React.FC = () => {
  return (
    <div className={styles.contioner}>
      {data.map(item => (
        <div className={styles.section} key={item.title}>
          <div>{item.title}</div>
          <div className={styles.sectionContioner}>
            {item.icons.map(i => (
              <div className={styles.iconBox} key={i}>
                <Icon className={styles.icon} type={i} />
                <span className={styles.iconName}>{i}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconDemo;
