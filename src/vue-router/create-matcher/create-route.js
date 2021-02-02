
export default function createRouteMap(routes, pathList = [], pathMap = {}) {


    routes.forEach(route => {
        addRouteRecord(route, pathList, pathMap, null)
    });
    return {
        pathList,
        pathMap
    }
}



function addRouteRecord(item, pathList, pathMap, parent) {
    let path = parent ? `${parent.path}/${item.path}` : item.path;

    if (!pathMap[path]) {
        pathList.push(path)
        pathMap[path] = {
            path,
            component: item.component,
            parent
        }
    }


    if (item.children) {
        item.children.forEach(ite => {
            addRouteRecord(ite, pathList, pathMap, item)
        })
    }
}