export default {
    functional: true,
    render(h, { parent, data }) {
        let route = parent.$route;
        let depth = 0;
        data.routerView = true;  // 每次渲染时候把自己标记一下
        while (parent) {
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent;
        }
        let record = route.matched[depth];
        if (!record) {
            return h();
        }
        return h(record.component, data);
    }
}