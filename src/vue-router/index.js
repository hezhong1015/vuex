import install from "./install";
import createMatcher from './create-matcher'
import HashHistory from './history/hash'


export default class VueRouter {
    constructor(options) {
        this.options = options;
        this.mode = options.mode || "hash";
        this.matcher = createMatcher(options.routes || []);
        this.history = new HashHistory(this);
        this.beforeHooks = [];
    }


    beforeEach(fn) {
        this.beforeHooks.push(fn);
    }
    
    init(app) {
        const history = this.history;
        // 初始化时，应该先拿到当前路径，进行匹配逻辑

        history.listen((route) => {
            console.log("页面更新");
            app._route = route
        })

        // 让路由系统过度到某个路径
        const setupHashListener = () => {
            history.setupListener(); // 监听路径变化
        }
        history.transitionTo(history.getCurrentLocation(), setupHashListener)
    }

    match(path) {
        return this.matcher.match(path)
    }
    push(path) {
        window.location.hash = path
    }
}
VueRouter.install = install;

