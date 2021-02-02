import createRouteMap from "./create-route"

export function createRoute(record, location) { 
    let res = [];
    if (record) {
        while(record){
            res.unshift(record); 
            record = record.parent
        }
    }
    return {
        ...location,
        matched: res
    }
}

export default function createMatcher(routes) {

    let { pathList, pathMap } = createRouteMap(routes);

    function addRoutes(routes) {
        // 将新增的路由追加到pathList和pathMap中
        createRouteMap(routes, pathList, pathMap);
    }
    function match(path) {
        let record = pathMap[path]
        if (record) {
            return createRoute(record, {
                path: location
            })
        }

        return createRoute(null, {
            path: location
        })
    }
    return {
        addRoutes,
        match
    }
}