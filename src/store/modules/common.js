/**
 * @file 通用数据
 */

import { uc } from '@/utils/api';

const state = {
    /**
     * 用户数据
     *
     * @type {Object}
     */
    userinfo: null,
};

const getters = {};

const mutations = {
    // 设置用户数据
    SET_USERINFO(state, payload) {
        state.userinfo = payload;
    },
};

const actions = {
    // 统一退出方法
    SET_LOGOUT({
        commit,
    }, {
        useapi = true,
    } = {
        useapi: true,
    }) {
        return new Promise((resolve, reject) => {
            if (useapi) {
                uc.signOut().then((res) => {
                    if (res.success) {
                        // 清空用户信息
                        commit('SET_USERINFO', null);

                        // 清空授权 cookie 标识
                        // clear();

                        resolve();
                    } else {
                        reject();
                    }
                }, () => reject());
            } else {
                // 清空用户信息
                commit('SET_USERINFO', null);

                // 清空授权 cookie 标识
                // clear();

                resolve();
            }
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
