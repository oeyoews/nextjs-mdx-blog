---
title: "再探 Nuxt3"
date: 2024/3/1 11:30:28
summary: Nuxt3 的使用经历和挑战：初次接触时网络问题需手动解决，但其优势在于 SEO 支持和环境变量管理；组件自动导入可能引发重复命名问题，而对于 Vue 模板标签需留意细节；页面缓存需手动启用，同时 SSR 和 SSG 的结合需要小心谨慎。
---

## 接触 Nuxt3

* 首次接触 Nuxt3 的第一个障碍就是网络问题。nuxt cli 使用 tar.gz 的模版地址，其实模版没有什么东西。最直接的解决办法就是手动下载那个 tar.gz, 或者手动安装 nuxt npm package, 然后复制一些配置文件 就行了。

* 看了一些 nuxt 的文档后就没有深入使用了。

## 再次接触 Nuxt3

* 最近在使用 nuxt3 将 Next.js 的 blog 重写一下。

## 为什么不直接用 vue 呢

blog 为了 seo, 必须要使用 ssr, nuxt 在 vue 的基础上对 ssr 有很好的支持

## Nuxt 环境变量

* 虽然已经有了 Next.js 的环境变量的使用基础。但是 nuxt3 使用环境变量的方法又稍微不同，网上的配置环境变量的方法有很多种，但是有很多局限，甚至限制了 nuxt 版本。以下是官方文档推荐使用的方法 useRuntimeConfig (nuxt 3.10.x)

nuxt 的的服务端环境变量都要写在 config 里面，默认值可以为空，运行时会被 .env 的 NUXT_xxx 的环境变量覆盖 xxx 的真实环境变量。部署环境下则需要在后台将.env 的变量填写到后台的系统环境变量中。

客户端环境变量 同理，只不过是被 Nuxt_PUBLIC_xxx 重写

以上只是配置变量，使用上也不是使用传统的 process.env，而是使用 useRuntimeconfig 来访问环境变量

```ts
// config
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    GITHUB_TOKEN: '', // server env
    public: {
      apiBase: '/api', // client env
    },
  },
});

// read env

const env = useRuntimeConfig();
console.log(env.GITHUB_TOKEN)
```

## 组件自动导入

* 之前就看到过这个，但是如果有相同名字的组件会怎么处理呢。最近遇到了这个 bug.

`prose/h1.vue` 按照 react 的经验，代码应该是这样写的

```vue
<H1 /> // correct is <ProseH1 />
```

但是根本不是这样，这样写最终会直接生成一个 h1 的标签。虽然 vscode 的 goto defination 扩展插件也可以跳转到对应的组件里面 (应该算是 bug 了).

https://nuxt.com/docs/guide/directory-structure/components

在仔细看了上面的文档后发现可以 使用配置修复这个问题，nuxt 的自动导入对于嵌套文件夹来说，会使用文件夹的名字代替组件名。但是如果禁用了这个 prefix，感觉还是会有重复组件的问题

但是很多库的组件都是这样写的 `Prose/ProseH1.vue` 的写法，这种写法官方文档似乎没有提及 (nuxt3 的热加载依旧问题很多，H1 改成 ProseH1 后，nuxt 识别不到，需要重启)

## utils 自动导入

类似于组件自动导入，但是如果在 server 里面写，需要放到 server/utils目录下，而不是放在外层 https://nuxt.com.cn/docs/guide/concepts/auto-imports

## fragment

v-for 如果不希望生成多余的节点，可以借助 react 的 fragment 的用法，但是搜了一圈没有对应的用法，后来发现 可以使用 `<template>` 来实现。

## template

* 使用 v-if，如果不符合条件会过滤掉，但是生成的 html 中会一个标志 `<!--v-if-->`
* 每个 template 也都会生成一个额外的注释 `<!--[-->]` `<!--]-->`

## 页面（路由）缓存

* 按照以前 Next.js 的经验，以为 nuxt 会自动开启 页面缓存，但其实需要手动开启，最简单的方法就是 开启 keepalive 的配置，或者手动在每个页面加上 keepalive

```ts
// nuxt.cofig.ts
export default defineNuxtConfig({
  app: {
    keepalive: true
  }
});

```

```vue
// or pages/some-page.vue
<script setup>
definePageMeta({
  keepalive: true;
})
</script>
```

## SSG

* 使用 build 不会有 ssg 的效果，如果使用 generate 命令，会导致 api/路由失效，因为此时是一个静态页面.

nuxt 的 isr 似乎和 ssg 不能很好的结合？？？
keepalive 会阻止 nuxt 的 isr/swr 的刷新

## computed

React: 如果一个值可以基于现有的 props 或 state 计算得出，不要把它作为一个 state，而是在渲染期间直接计算这个值 https://zh-hans.react.dev/learn/you-might-not-need-an-effect

Vue: 使用计算属性来描述依赖响应式状态的复杂逻辑 则是使用 computed 来做 https://cn.vuejs.org/guide/essentials/computed 更强调缓存

## v-show

* 虽然知道了 v-show 是通过样式控制的，但是很容易忘记样式中含有 display 的样式，会导致 v-show 失效.

## Emit

* emit, 支持自定义事件 类似于事件的冒泡机制.  类似于 react 中将函数传递给子组件，子组件调用函数来改变父组件的状态. emit 主要是可以在子组件中利用父组件的方法. 父子通信中的子传父 , 父传子子传父核心都是通信