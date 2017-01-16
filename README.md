# vue-logconsole

> vue的一个插件，主要用于在移动应用开发测试阶段记录日志，并提供界面实时查看。使用localstorage存储日志。

## 使用方法
`npm install vue-logconsole`

```js
// main.js
import Vue from 'vue'
import logConsole from 'vue-logconsole'

Vue.use(logConsole, {
    maxSize: 2 * 1024 * 1024, // 默认占用localstorage 1M空间
    threshold: -1 // 级别小于该值的日志不会被记录，{debug: 0, info: 1, warn: 2, error: 3}。生产环境不记录日志可设置值为999
})

Vue.Logger.debug('test', '测试')

// App.vue
<log-console :show=true @close-log-page="closeLogPage"></log-console>
```

## 功能预览
记录日志  
![](https://raw.githubusercontent.com/hughfenghen/vue-logconsole/master/static/logger.debug.gif)  
按关键字过滤日志  
![](https://raw.githubusercontent.com/hughfenghen/vue-logconsole/master/static/filter.gif)  
按等级过滤日志  
![](https://raw.githubusercontent.com/hughfenghen/vue-logconsole/master/static/click_lev.gif)  

## API  
* Vue.Logger.debug('tag', 'content')  
    记录debug日志，级别为0
* Vue.Logger.info('tag', 'content')  
    记录info日志，级别为1
* Vue.Logger.warn('tag', 'content')  
    记录warn日志，级别为2
* Vue.Logger.error('tag', 'content')  
    记录error日志，级别为3
