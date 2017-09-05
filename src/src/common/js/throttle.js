//节流器
export var Throttle = function(fn) {
    var self = this
    clearTimeout(fn.__Throttle);

    fn.__Throttle = setTimeout(function() {

        fn.call(self)
    }, 30)

}
//修正图片路径
//这里没少花我的功夫，刚开始组件创建的时候
//这个方法就执行啦，进来的undefine,报错
export var logoUrl = function(path) {
    if (!path) return;
    var type = path.match(/(png)*(jpeg)*(jpg)*$/)[0];
    return 'http://fuss10.elemecdn.com/' + path[0] + '/' + path.slice(1, 3) + '/' + path.slice(3) + '.' + type + '?imageMogr2/thumbnail/70x70/format/webp/quality/85';
}
