---
title: videoControl
nav:
  title: 组件
  path: /components
group:
  title: 媒体组件
  path: /media
---

## Text

Demo:

```tsx
import React from 'react';
import { VideoControl } from 'yzh-mobile';

const VideoControlDemo: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <VideoControl src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" />
    </div>
  );
};

export default VideoControlDemo;
```

<API/>
