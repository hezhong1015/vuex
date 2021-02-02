

import { createRoute } from "../create-matcher/index"

function ensureSlash() {
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}


function getCurrenPath() {
    let path = window.location.hash
    return path.substring(1)
}


function runQueue(queue, iterator, cb) {
    function step(index) {
        if (index >= queue.length) {
            cb();
        } else {
            let hook = queue[index];
            iterator(hook, () => {
                step(index + 1)
            })
        }
    }
    step(0)
}




class History {
    constructor(router) {
        this.router = router;
        this.current = createRoute(null, {
            path: '/'
        })
    }

    transitionTo(path, listener) {
        let route = this.router.match(path);
        if (route.path === this.current.path && this.current.matched === route.matched) {
            return
        }

        let queue = [].concat(this.router.beforeHooks);

        const iterator = (hook, next) => {
            hook(route, this.current, () => { // 分别对应用户 from，to，next参数
                next();
            });
        }

        runQueue(queue, iterator, () => { // 依次执行队列 ,执行完毕后更新路由
            this.updateRoute(route)
            listener && listener()
        });
    }
    listen(cb) {
        this.cb = cb;
    }

    updateRoute(route) {
        this.current = route
        this.cb && this.cb(route)
    }
}

class HashHistory extends History {
    constructor(router) {
        super(router)
        ensureSlash()
    }

    setupListener() {
        window.addEventListener('hashchange', () => {
            // 根据当前hash值 过度到对应路径
            this.transitionTo(getCurrenPath());
        })
    }

    getCurrentLocation() {
        let path = getCurrenPath();
        return path
    }

}



export default HashHistory