---
title: Button
nav:
  title: 组件
  path: /components
group:
  title: 通用
  path: /common
---

## Button

Demo:

```tsx
/**
 * title: Button
 * desc: 不依赖三方 UI 库的 button 组件
 */

import React from 'react';
import { Button } from 'yzh-mobile';

export default () => (
  <div>
    <Button size="lg">large button</Button>
    <br />
    <Button size="sm">small button</Button>
    <br />
    <Button btnType="primary"> primary button </Button>
    <br />
    <Button btnType="danger"> danger button </Button>
    <br />
    <Button btnType="primary" disabled>
      disabled button
    </Button>
    <br />
    <Button btnType="link" href="https://google.com">
      link button
    </Button>
  </div>
);
```
