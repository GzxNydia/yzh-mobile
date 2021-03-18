import React from 'react';
import { Cell } from 'yzh-mobile';
import './index.less';

export default () => (
  <div>
    <p className="title">基础用法</p>
    <Cell title="标题">右侧内容</Cell>
    <Cell title="标题" label="描述信息">
      右侧内容
    </Cell>

    <p className="title">展示箭头</p>
    <Cell title="标题" arrow="right" clickable></Cell>
    <Cell title="标题" arrow="down" clickable>
      右侧内容
    </Cell>
    <Cell title="标题" label="描述系信息" arrow="right" clickable>
      右侧内容
    </Cell>
  </div>
);
