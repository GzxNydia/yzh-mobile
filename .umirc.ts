import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'yzh-mobile',
  favicon:
    'https://infra-engineering-yos-prod.obs.cn-north-1.myhuaweicloud.com/9cdcb2f3dc540c966fa42e765855ba51a47de429-logo_%E4%BA%91%E8%B4%A6%E6%88%B7logo%402x.png',
  logo:
    'https://infra-engineering-yos-prod.obs.cn-north-1.myhuaweicloud.com/9cdcb2f3dc540c966fa42e765855ba51a47de429-logo_%E4%BA%91%E8%B4%A6%E6%88%B7logo%402x.png',
  outputPath: 'docs-dist',
  mode: 'site',
  base: '/yzh-mobile',
  publicPath: '/yzh-mobile/',
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  styles: ['.markdown > h4 { color: #1890ff !important}'],
  themeConfig: {
    hd: {
      // 禁用高清方案
      rules: [],
    },
  },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/GzxNydia/yzh-mobile',
    },
  ],
  // plugins: [join(__dirname, './plugins/umi-plugin.ts')],
});
