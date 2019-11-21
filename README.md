# NgWyy 视频地址：
- B站：https://www.bilibili.com/video/av70355308
- 网易云课堂：https://study.163.com/course/courseMain.htm?share=2&shareId=480000001947524&courseId=1209529841&_trace_c_p_k2_=832892bbbabb45d2889f5308a17244e8
- 51cto: https://edu.51cto.com/course/19942.html

## `core.module`只能被`app.module`引入

项目中`core.module`只能被`app.module`引入，其他模块引入`core.module`我们要抛出个错误，所以在导出的时候要做一下处理。

下面这段代码的意思是，`app.module`第一次引入`core.module`时，`parentModule`是空的，所以里面的代码不会执行。当其他模块再次引入`core.module`时，`parentModule`就不是空了。我们就会给他抛出个错误。

`@SkipSelf`装饰器作用是，在查找`CoreModule`类时不查找自己，也就是跳过自身，去父级找有没有`CoreModule`，就能避免无限循环的问题。

如果被依赖的`Module`没有被找到的话，就会报一个错误，第一次注入时肯定是找不到的，所以这里允许它是不存在的。使用`@Optional`装饰器作用是，如果`parentModule`不存在时，给它赋值一个`null`。

```js
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
}
```