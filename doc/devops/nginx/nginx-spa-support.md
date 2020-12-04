---
title: Nginx 单页应用配置
---

```
location / {
  try_files $uri /index.html;
}
```

- [Nginx配置React项目 - React-Router刷新404](https://code-examples.net/zh-CN/q/29ea668)