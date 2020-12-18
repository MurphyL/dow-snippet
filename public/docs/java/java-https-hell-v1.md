## InvalidAlgorithmParameterException - 安全基础类库或者证书错误

> java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty

```txt
-Djavax.net.ssl.trustStore=%JAVA_HOME%\jre\lib\security\cacerts
-Djavax.net.ssl.trustAnchors=%JAVA_HOME%\jre\lib\security\cacerts

# 拷贝 cacerts 文件到 %JAVA_HOME%/jre/lib/security 目录，注意密码
-Djavax.net.ssl.trustStore=cacerts
-Djavax.net.ssl.trustStorePassword=123456
-Djavax.net.ssl.trustStoreType=JKS
```

### 证书操作

> 需要指定密码

```sh
# 列出所有证书
keytool -list -keystore cacerts -alias murph
# 删除证书
keytool -delete -alias murph -keystore cacerts
# 安装证书
keytool -import -alias murph -keystore cacerts -file ./x.cer
```

## CertificateException - 证书错误

> java.security.cert.CertificateException: No subject alternative DNS name matching found.

证书中暂不支持使用的`IP`或者域名（尤其注意`127.0.0.1`和`localhost`）。