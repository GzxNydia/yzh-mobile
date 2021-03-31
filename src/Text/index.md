---
title: Text
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /common
---

## Text

Demo:

```tsx
import React from 'react';
import { Text } from 'yzh-mobile';

const VideoPlayerDemo: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Text>这是一句默认文本</Text>
      <Text size={40}>这是一句大一点的文本</Text>
      <Text color="#ccc">这是一句灰一点的文本</Text>
      <Text weight="bold">这是一句粗一点的文本</Text>
      <Text weight="bold" size={24} color="#f8584f">
        这是一句完全不同的文本
      </Text>
    </div>
  );
};

export default VideoPlayerDemo;
```

<API/>
