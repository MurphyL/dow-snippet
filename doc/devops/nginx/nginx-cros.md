---
title: 处理跨域等问题
sort: 9999
---

### `HTTP`请求头

```ini
Access-Control-Allow-Origin: *
```

### `Nginx`配置

```
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