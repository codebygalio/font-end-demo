<template>
    <div class="my-container">
        <!-- 未登录头部 -->
        <div class="header no-login" v-if="!user.userTokens">
            <div class="login-group" @click="$router.push('/login')">
                <img class="sign-in-img" src="~@/assets/img/mobile.png" />
                <span class="text">登录 / 注册</span>
            </div>
        </div>
        <!-- 已经登录头部 -->
        <div class="header yes-login" v-else>
            <div class="top">
                <div class="left">
                    <van-image round class="avatar" :src="userInfo.photo" />
                    <span class="text"> {{ userInfo.name }} </span>
                </div>
                <div class="right">
                    <van-button class="edit" round size="mini" @click="$router.push({name:'Profile'})"
                        >编辑资料</van-button
                    >
                </div>
            </div>
            <div class="bottom info">
                <div class="item">
                    <span class="count">{{ userInfo.art_count }}</span>
                    <span class="text">头条</span>
                </div>
                <div class="item">
                    <span class="count">{{ userInfo.follow_count }}</span>
                    <span class="text">关注</span>
                </div>
                <div class="item">
                    <span class="count">{{ userInfo.fans_count }}</span>
                    <span class="text">粉丝</span>
                </div>
                <div class="item">
                    <span class="count">{{ userInfo.like_count }}</span>
                    <span class="text">获赞</span>
                </div>
            </div>
        </div>
        <!-- 宫格导航 -->
        <van-grid :column-num="2" class="grid-nav" clickable>
            <van-grid-item class="grid-nav-item">
                <i slot="icon" class="icon-9 grid-shoucang"></i>
                <span slot="text" class="text">收藏</span>
            </van-grid-item>
            <van-grid-item class="grid-nav-item">
                <i slot="icon" class="icon-5 grid-lishi"></i>
                <span slot="text" class="text">历史</span>
            </van-grid-item>
        </van-grid>
        <div class="multi">
            <van-cell class="multi-item" title="消息通知" is-link />
            <van-cell class="multi-item" title="小智同学" @click="$router.push({name:'Chat'})" is-link />
            <van-cell
                class="login-out"
                title="退出登录"
                v-if="user.userTokens"
                @click="loginout"
            />
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
    name: "My",
    data() {
        return {
            userInfo: {},
        };
    },
     created() {
        if (this.user.userTokens) {
            this.getUserInfo();
        }
    },
    computed: {
        ...mapState(["user"]),
    },
    methods: {
        async getUserInfo() {
            try {
                const { data } = await getUserInfo();
                this.userInfo = data;
                this.$store.commit('setUserInfo',data)
                // console.log(data);
            } catch (err) {
                if (!err) return;
                this.$toast("获取数据失败,请稍后重试");
            }
        },
        loginout() {
            this.$Dialog
                .confirm({
                    message: "确定退出吗?",
                })
                .then(() => {
                    this.$store.commit("setUserTokens", null);
                })
                .catch(() => {
                    return;
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.my-container {
    background-color: #f5f7f9;
    height: 100%;
    .header {
        background-image: url("~@/assets/img/banner.png");
        height: 361px;
        background-size: cover;
    }
    .header.no-login {
        display: flex;
        justify-content: center;
        align-items: center;
        .login-group {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .sign-in-img {
                width: 132px;
                height: 132px;
            }
            .text {
                margin-top: 15px;
                font-size: 28px;
                font-family: "微软雅黑";
                color: #ffffff;
            }
        }
    }
    .header.yes-login {
        box-sizing: border-box;
        .top {
            padding: 76px 32px 23px 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 231px;
            box-sizing: border-box;
            .left {
                display: flex;
                align-items: center;
                .avatar {
                    width: 132px;
                    height: 132px;
                    margin-right: 23px;
                    border: 2px #ffffff solid;
                    box-sizing: border-box;
                }
                .text {
                    font-size: 30px;
                    color: #ffffff;
                }
            }
        }
        .bottom {
            height: 130px;
        }
        .bottom.info {
            display: flex;
            .item {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .count {
                    font-size: 36px;
                    color: #ffffff;
                    font-family: Arial;
                }
                .text {
                    font-size: 23px;
                    color: #ffffff;
                    font-family: "微软雅黑";
                    margin-top: 20px;
                }
            }
        }
    }
    .grid-nav {
        .grid-nav-item {
            height: 141px;
            .text {
                font-size: 28px;
                font-family: "微软雅黑";
                margin-top: 16px;
            }
            .grid-shoucang {
                font-size: 45px;
                color: #eb5253;
            }
            .grid-lishi {
                font-size: 45px;
                color: #ff9d1d;
            }
        }
    }
    .multi {
        margin-top: 9px;
        .multi-item {
            height: 100px;
        }
        .login-out {
            height: 104px;
            color: #d86262;
            text-align: center;
            display: flex;
            align-items: center;
            font-size: 30px;
            font-family: "微软雅黑";
            margin-top: 9px;
        }
    }
}
</style>