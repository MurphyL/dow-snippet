### `HTTP`请求头

```cnf
server {
    listen       80;
    server_name  murphyl.com;

    access_log  /var/log/nginx/murphyl.com.log  main;

    location ~ .*\.(jpg|jpeg|png|ico|js|css|gif)$ {
        root /tmp/static;
    }

    location / {
        proxy_set_header  Host  $host;
        proxy_set_header  X-real-ip $remote_addr;
        proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass   http://192.168.1.1:8019/;
    }
}
```