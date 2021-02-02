
import routerlink from "./detectives/router-link"
import routerView from "./detectives/router-view"
let Vue;
function install(_Vue) {
    if (Vue) {
        return false
    }
    Vue = _Vue;

    Vue.mixin({
        beforeCreate() {
            //  在这里就是在组件上挂载一个根组件的实例
            if (this.$options.router) { 
                this._routerRoot = this; 
                this._router = this.$options.router; 
                this._router.init(this); 
                Vue.util.defineReactive(this,'_route',this._router.history.current);
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
        }
    })

    Object.defineProperty(Vue.prototype,'$route',{ // 每个实例都可以获取到$route属性
        get(){
            return this._routerRoot._route;
        }
    });

    Object.defineProperty(Vue.prototype,'$router',{ // 每个实例都可以获取router实例
        get(){
            return this._routerRoot._router;
        }
    })

    Vue.component('router-link', routerlink)
    Vue.component('router-view', routerView)
}


export default install