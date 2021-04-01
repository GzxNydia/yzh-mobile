---
title: NoticeBar
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /common
---

## NoticeBar

Demo:

```tsx
import React from 'react';
import { NoticeBar } from 'yzh-mobile';

const VideoPlayerDemo: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <NoticeBar>这是一句默认文本</NoticeBar>
      <NoticeBar showIcon={false}>没有图表的文本</NoticeBar>
      <NoticeBar color="#ff5050" bgcolor="#e6a6a670">
        这是一句改变背景文案颜色一点的文本
      </NoticeBar>
      <NoticeBar>
        当前文本超出了屏幕宽度，组件会自动开启滚动功能，前后停留时间和滚动速度可以自定义设置，更多用法请参见使用文档。
      </NoticeBar>
    </div>
  );
};

export default VideoPlayerDemo;
```

<API/>
