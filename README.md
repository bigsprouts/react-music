# react-music

## 使用es6语法

## router暂时未使用router4

## 复杂组件之间的通信，发布与订阅与解除绑定（未使用redux）

```
Pubsub.publish('事件名',入参)
Pubsub.subscribe('事件名', (msg, item) => {}); msg是Pubsub传过来的一个参数，第二个开始才是发布传过来的参数
Pubsub.unsubscribe('事件名')
```

## link组件，解决父子组件参数传递问题

{ this.props.children } 指的是当前页面对应的路由的component，但是 怎么传入参数，clone,
```
eg:{React.cloneElement(this.props.children,this.state)}
```

## 子组件传递父组件（回调函数）
  父组件写处理函数，子组件props接收，点击调用
```
eg:父组件 <Child onClickHandler = {this.clickHandler1.bind(this)} /> 以及 定义clickHandler函数
   子组件 <div onClick={this.clickEvent.bind(this)}></div>
          clickEvent(e) {
            this.props.onClickHandler && this.props.onClickHandler(e....);
          }
```
          
## react无法直接操作dom的解决办法

定义ref=""，react会把定义了ref属性的真实的DOM，传入refs。
```
eg: <div ref="a" onClick = {this.clickhandler.bind(this)}></div>
    clickhandler(e) {
      let aDom = e.refs.a;
      let aLeft = aDom.getBoundingClientRect().left)
    }
```


