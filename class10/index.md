# event loop

-   Operation system
    -   heap
    -   Stack
    -   Process
        -   Thread
        -   Thread
    -   Process
        -   Thread
        -   Thread
            <br><br>

## 자바스크립트 런타임 환경

-   js는 single Threaded
-   wab api를 이용하면 mutil Threaded 가능
-   javascript Engine
    -   Memory Heap
    -   Call stack LIFO (Last In First Out)

```
function  second(){
    console.log('hello')
    return;
}
function  first(){
    second();
    return;
}
function  main(){
    first();
    return;
}
Stack LIFO
main() > first() > second() > first() > main()
```

## 10.5 전반적인 큰 그림 이해
Web APIs
_Render_
Rquest Animation Frame / Render Tree / Layout /Paint

_Microtask Queue_
promise then / mutation observer

_Task Queue_
setTimout callback/ click callback
