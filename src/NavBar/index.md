---
title: NavBar
nav:
  title: 组件
  path: /components
group:
  title: 导航组件
  path: /nav
---

## Button

Demo:

```tsx
/**
 * title: NavBar

 */

import React from 'react';
import { NavBar, Icon } from 'yzh-mobile';

export default () => (
  <div>
    <NavBar title="标题" border right="右边" leftArrow />

    <NavBar
      title="标题"
      border
      right={<Icon type="search" size={18} />}
      leftArrow
      onClickLeft={() => console.log('click left')}
      onClickRight={() => console.log('click right')}
    />
  </div>
);
```

<API></API>
