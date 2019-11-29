<template>
    <div @click="clickHandle">

        <div
            class="userinfo"
            @click="bindViewTap">
            <img
                class="userinfo-avatar"
                src="/static/images/user.png"
                background-size="cover" >

            <div class="userinfo-nickname">
                <card :text="userInfo.nickName"/>
            </div>
        </div>

        <div class="usermotto">
            <div class="user-motto">
                <card :text="motto"/>
            </div>
        </div>

        MyDate:
        <MyDate :data="1574812419795"/>
        <!-- <MyDate :data="+new Date()"/> -->
        <!-- <MyDate :data="undefined"/> -->

        <form
            class="form-container"
            @submit="formSubmit"
            @reset="formReset">
            <input
                type="text"
                class="form-control"
                :value="motto"
                name="value"
                placeholder=":value" >
            <input
                type="text"
                class="form-control"
                v-model="motto"
                name="model"
                placeholder="v-model" >
            <input
                type="text"
                class="form-control"
                v-model.lazy="motto"
                name="model.lazy"
                placeholder="v-model.lazy" >
            <button formType="submit">Submit</button>
            <button formType="reset">Reset</button>
        </form>

        <div>
            <picker
                @change="bindPickerChange"
                :value="index"
                :range="array">
                <view class="picker">
                    当前选择：{{ array[index] }}
                </view>
            </picker>
        </div>

        <div>
            <radio-group
                class="radio-group"
                @change="radioChange">
                <label
                    class="radio"
                    v-for="item in items"
                    :key="item.name">
                    <radio
                        :value="item.name"
                        :checked="item.checked"/> {{ item.value }}
                </label>
            </radio-group>
        </div>

        <a
            href="/pages/counter/main"
            class="counter">去往Vuex示例页面</a>
        <div @click="req">test request</div>
        <div @click="interactive">test toast</div>

        <van-button type="primary">按钮</van-button>

        <div class="all">
            <div class="left"/>
            <div class="right"/>
        </div>
    </div>
</template>

<script>
import card from '@/components/card';
import { getJson } from '@/utils/api';

export default {
    data() {
        return {
            motto: 'mpvue',
            userInfo: {
                nickName: 'mpvue',
            },
            index: 0,
            array: ['A', 'B', 'C'],
            items: [
                { name: 'USA', value: '美国' },
                { name: 'CHN', value: '中国', checked: 'true' },
                { name: 'BRA', value: '巴西' },
                { name: 'JPN', value: '日本' },
                { name: 'ENG', value: '英国' },
                { name: 'TUR', value: '法国' },
            ],
        };
    },

    components: {
        card,
    },

    methods: {
        bindViewTap() {
            const url = '../logs/main';
            mpvue.switchTab({ url });
        },
        clickHandle(ev) {
            console.log('clickHandle:', ev);
            // throw {message: 'custom test'}
        },
        async req() {
            const res = await getJson({ data: { type: 123 } });
            console.log(res);
        },
        bindPickerChange({ mp: { detail: { value } } }) {
            console.log(value);
            this.index = value;
        },
        radioChange(e) {
            console.log('radio发生change事件，携带value值为：', e.target.value);
        },
        storage() {
            wx.setStorageSync('key', 'value');
            wx.removeStorageSync('key');
            const val = wx.getStorageSync('key');

            if (val) {
                console.log(val);
            }

            wx.clearStorageSync();
        },
        interactive() {
            // wx.showToast({
            //     title: '成功',
            //     icon: 'success',
            //     duration: 2000,
            // });

            // wx.showModal({
            //     title: '提示',
            //     content: '这是一个模态弹窗',
            //     success(res) {
            //         if (res.confirm) {
            //             console.log('用户点击确定');
            //         } else if (res.cancel) {
            //             console.log('用户点击取消');
            //         }
            //     },
            // });

            // wx.showLoading({
            //     title: '加载中',
            // });

            // setTimeout(() => {
            //     wx.hideLoading();
            // }, 2000);

            // wx.showActionSheet({
            //     itemList: ['A', 'B', 'C'],
            //     success(res) {
            //         console.log(res.tapIndex);
            //     },
            //     fail(res) {
            //         console.log(res.errMsg);
            //     },
            // });

            // 页面title loading
            // wx.showNavigationBarLoading();

            // setTimeout(() => wx.hideNavigationBarLoading(), 3000);
        },
        formReset() {
            console.log('form发生了reset事件');
        },
        formSubmit(e) {
            console.log('form发生了submit事件，携带数据为：', e.mp.detail.value);
        },
    },

    created() {
        // let app = getApp()
    },

    mounted() {
        // query 需要在mounted后获取
        console.log(this.$root.$mp.query);
        console.log(this.$store);
        console.log(4321);
    },
};
</script>

<style scoped lang="scss">
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
