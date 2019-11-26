export default ($wx) => {
    const handler = {
        get(target, property) {
            target[property] = ({
                url,
                params = {},
                loading = false,
            }) => new Promise((resolve) => {
                if (loading) {
                    wx.showLoading({
                        title: '加载中', // 数据请求前loading，提高用户体验
                    });
                }
                $wx.request({
                    url,
                    method: property.toLocaleUpperCase(),
                    ...params,
                    success: (res) => {
                        if (Number(res.statusCode) !== 200) {
                            $wx.showToast({
                                title: '当前网络异常,请稍后再试',
                                icon: 'none',
                            });
                            return false;
                        }

                        resolve(res.data);
                    },
                    fail: (error) => {
                        if (process.env.NODE_ENV !== 'production') {
                            console.log('Request Error:', error);
                        }
                        return false;
                    },
                    complete: () => {
                        if (loading) {
                            wx.hideLoading();
                        }
                    },
                });
            });
            return target[property];
        },
    };

    const API = new Proxy({}, handler);
    return API;
};
