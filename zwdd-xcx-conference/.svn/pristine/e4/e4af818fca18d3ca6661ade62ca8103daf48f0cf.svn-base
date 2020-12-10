# 政务钉钉多端统一 JSAPI

此 JSAPI 支持运行于 android, ios, pc(win) 客户端的 H5 应用和政务钉钉小程序环境，且保持开发体验一致。

1. 支持返回原生 Promise
2. 支持模块化引入 api，模块化引入平台
3. 支持 typescript 的接口定义，接口定义还在持续添加中，如有纰漏欢迎反馈

## 安装

```shell
npm install gdt-jsapi
```

推荐使用 npm 包形式按需引入

## 使用介绍

H5 和小程序都可以通过以下方式进行引入

### 1. 按需引入

#### 整体调用

```typescript
import dd from 'gdt-jsapi';

dd.alert({ message: 'hello world' })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```

#### 按需调用

```typescript
import alert from 'gdt-jsapi/alert'; // 按需引入方法

alert({ message: 'hello world' })
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
```
