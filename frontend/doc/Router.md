# Router 처리
## 1.개요
단일 페이지 어플리케이션(SPA)에서 가장 먼저 처리해야 할 것이 바로 라우팅이다.
기본적으로 서버에서 라우팅은 URI에 따라 해당하는 정적 파일을 내려주는 방식이다. 
vue-router 방식은 JS를 사용하여 windows.history를 적용하여 서버에 요청하지 않고 라우팅 할 수 있게 구현을 하였다. 

window.history.pushState와, window.history.replaceState 사용하여 브라우저 상에서 url를 조작하는 방식으로 동작한다.

![vuerouter](https://user-images.githubusercontent.com/32254689/71607747-58fdd700-2bbf-11ea-90d9-08ba4c8fea72.png)

## 2.vue-router의 생명주기 

vue-router의 생명주기는 아래의 그림과 같다.

![vuerouter](https://t1.daumcdn.net/cfile/tistory/9957E4425C8523D333)


## 3. 네비게이션 가드
네비게이션 가드는 뷰 라우터의 훅을 주로 다른 곳으로 리다이렉션 하거나, 또는 페이지 이동을 취소하여 네비게이션을 보호하는 데 사용되어 라이프사이클 훅을 가드 또는 훅이라고 부른다.

네비게이션 가드는 적용 범위에 따라 전역가드, 라우트별 가드, 컴포넌트별 가드로 나누어 진다.
그리고 다시 가드의 호출 타이밍에 따라 before 또는 after 훅으로 나누어진다.  

## 4. 네비게이션 가드 훅
### 4-1. beforeRouteLeave
기존 컴포넌트가 제거 되기전에 호출 되는 훅

이 훅은 주로 저장 되지 않은 상태로 다른 곳으로 이동 하는 것을 방지하는데 사용

**선언은 컴포넌트 스크립트 내에 선언**

```js
// file: "beforeRouteLeave"
export default {
    beforeRouteLeave(to, form, next) {
        if(confirm('이사이트에서 나가겠습니까?')){
            next();
        } else {
            next(false);
        }
    }
}
```

### 4-2. beforeEach
기존의 컴포넌트가 제거된 후 새로운 네비게이션이 시작될 때 호출

이동할 라우트의 컴포넌트들을 불러오기 전에 실행되는 훅으로 어떤 페이지에 이동하는지에 관계없이 실행되며 이를 전역가드 (global guards)라고 부른다.

```js
// file : "router/index.js"
const router = new VueRouter({ ... });

router.beforeEach((to, from, next) => {
    // ...
});
```

### 4-3. beforeRouteUpdate
컴포넌트를 재사용 할 경우에만 발생하는 훅

재사용이란 예를들어 다음라우터 /card/detail/1 에서 다음 카드 /card/detail/2 로 게시판의 페이지를 이동하였을 경우 페이지의 컴포넌트는 유지가 되고 내용등의 일부분만 변하는 형태를 컴포넌트 재사용이라고 부른다.

**선언은 컴포넌트 스크립트 내에 선언**

```js
// file: "beforeRouteUpdate"
export default {
    beforeRouteUpdate(to, form, next) {
        //...
    }
}
```

### 4-4. beforeEnter
이동하려는 라우트에 진입하기 전 호출되는 훅

라우트의 설정 객체에 직접 정의 할 수 있으며 라우트마다 각각 다르게 네비게이션 가드를 정의할 수 있다.

주로 특정 페이지에만 영향을 끼쳐야하는 로직이 있을 경우에 사용한다. 

**선언은 라우트의 설정 객체에 직접 정의**
```js
// file: "router/index.js"
routes: [
    {
        path: '/foo',
        component: Foo,
        beforeEnter: (to, from, next) => {
            // ...
        }
    }
]
```

### 4-5. beforeRouteEnter
새로운 컴포넌트를 만들기 전 호출되는 훅

아직 컴포넌트를 만들기 전 이므로 컴포넌트를 접근 할 수 없음

**선언은 컴포넌트 스크립트 내에 선언**
```js
// file: "beforeRouteUpdate"
export default {
    beforeRouteUpdate(to, form, next) {
        //...
    }
}
```

### 4-6. beforeResolve
네비게이션 작업을 완료하기 전에 호출되는 훅

전역가드로 사용
```js
// file : "router/index.js"
const router = new VueRouter({ ... });

router.beforeResolve((to, from, next) => {
    // ...
});
```

### 4-7. afterEach
네비게이션 작업이 완료된 후 호출되는 훅입니다.

다른 훅들과 달리 네비게이션 작업이 완료된 후 이므로, 네비게이션 작업에 영향을 미칠 수 없습니다.

공식 문서에서는 afterEach는 가드라고 표현하지 않고, 단순 훅으로만 부르고 있습니다.

```js
router.afterEach((to, from) => {
    // ...
})
```


## 5.Lazy Loading
Vue는 SPA 로써 하나의 Page로 이루어져 있어 코드분할을 하지 않으면 I/O 타임이 길어질 수 밖에 없다. 

이를 해결할 수 있는 가장 쉬운 방법은 Router 단위로 코드를 나누는 방법이다.

vue-cli 로 프로젝트 생성시 코드를 나누어도 진입시 코드를 한꺼번에 받아오는 prefetch 기능이 true이기 때문에 이 기능을 제거 후 원하는 화면에만 prefetch 기능을 넣는 것이 성능적으로 좋다. 

```js
// file: "vue.config.js"
module.exports = {
    chainWebpack: config => {
        config.pulugins.delete('prefetch');
    }
}
```

위의 소스처럼 prefetch 기능을 삭제 한다. 

Code Splitting(Lazy Loading)을 하는 방법은 router 소스를 다음과 같이 () => import('컴포넌트 경로')로 import 하면 된다. 

```js
const loginRouter =  [
    {
        path: '/login' ,
        component: () => import(/* webpackChunkName: "LoginPage", webpackPrefetch:true */ "Component 경로")
    }
]
```

위와 같이 사용 가능하며 주석으로 분할 된 Name또는 Prefetch 여부를 설정 할 수 있다.

- webpackChunkName : 분할된 청크 Name
- webpackPrefetch : prefetch 기능 on / off 기능 

## 6. Router File 관리
router를 도메인 별로 관리하기 위해서 라우터 file을 분리리한 후 index.js 파일로 routes 속성을 병합한다.
