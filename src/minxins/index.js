const MyPlugin = {
    install(Vue) {
        // 添加全局方法或属性
        Vue.prototype.$isPage = function isPage() {
            return this.$mp && this.$mp.mpType === 'page';
        };
        // 注入组件
        Vue.mixin({
            methods: {},
            onLoad() {},
            onUnload() {},
            onHide() {},
            onShow() {},
        });
    },
};
export default MyPlugin;
