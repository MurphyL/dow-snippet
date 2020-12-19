---
title: 'Nginx 单页应用配置'
list: true
icon: 'nginx'
---

## 首页重定向

```conf
location / {
  try_files $uri /index.html;
}
```


## `CORS`配置

```conf
server {
  listen 80;
  server_name api.localhost;

  location / {
    add_header 'Access-Control-Allow-Origin' 'http://api.localhost';
    add_header 'Access-Control-Allow_Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';

    if ($request_method = 'OPTIONS') {
      add_header 'Access-Control-Max-Age' 1728000;
      add_header 'Content-Type' 'text/plain charset=UTF-8';
      add_header 'Content-Length' 0;
      return 204;
    }

    proxy_redirect off;
    proxy_set_header host $host;
    proxy_set_header X-real-ip $remote_addr;
    proxy_set_header X-forward-for $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:3000;
  }
}
```

- [Nginx配置React项目 - React-Router刷新404](https://code-examples.net/zh-CN/q/29ea668)