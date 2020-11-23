---
title: "生成SSH密钥"
---

```sh
# 检查SSH keys是否已存在
ls -al ~/.ssh

# 生成SSH keys
ssh-keygen -t rsa -C "example@email.com"

# 拷贝SSH公钥到远程
ssh-copy-id remote_user@remote_host
```