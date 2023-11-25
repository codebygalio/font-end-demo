<template>
    <div class="comment-item">
        <div class="comment-relative">
            <van-image
                fit="cover"
                round
                class="comment-image"
                :src="comment.aut_photo"
            />
            <div class="user-comment-middle">
                <div class="user-name">{{ comment.aut_name }}</div>
                <div class="user-comment-content">{{ comment.content }}</div>
                <div class="user-comment-bottom">
                    <div class="user-comment-date">
                        {{ comment.pubdate | relativeTime }}
                    </div>
                    <van-button
                        @click="$emit('replay-click', comment)"
                        class="reply-button"
                        round
                        type="info"
                        size="small"
                        color="#f4f5f6"
                        >{{ comment.reply_count }}</van-button
                    >
                </div>
            </div>
            <!-- 按钮 -->
            <div class="good-button-container">
                <van-button
                    :loading="likeLoading"
                    @click="updateLiking(comment)"
                    :class="{ liked: comment.is_liking }"
                    class="good-button"
                    :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
                />
                <span class="good-number">{{
                    comment.like_count > 0 ? comment.like_count : null
                }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { addLiking, deleteCommentLike } from "@/api/comments.js";

export default {
    props: {
        comment: { type: Object },
    },
    data() {
        return {
            likeLoading: false,
        };
    },
    methods: {
        async updateLiking() {
            this.likeLoading = true;
            // console.log('object=',comment)
            try {
                if (this.comment.is_liking) {
                    const data = await deleteCommentLike(this.comment.com_id);
                    this.$toast.success("取消点赞");
                    this.comment.like_count -= 1;
                    // console.log("cancel=", data);
                } else {
                    const data = await addLiking(this.comment.com_id);
                    this.$toast.success("点赞成功");
                    this.comment.like_count += 1;
                    // console.log("addLiking=", data);
                }
                // console.log('!item.is_liking=',!item.is_liking)
                this.comment.is_liking = !this.comment.is_liking;
            } catch (err) {
                this.$toast("请求失败,请稍后重试");
            }

            this.likeLoading = false;

            // console.log('like=',data)
        },
    },
};
</script>
<style lang="scss" scoped>
.comment-item {
    padding: 54px 47px 0px 30px;
    .comment-relative {
        position: relative;
        display: flex;
        .user-comment-middle {
            flex: 1;
            padding-left: 25px;
            .user-name {
                line-height: 26px;
                padding: 5px 0 34px 0;
                font-size: 26px;
                color: #406599;
                font-family: "微软雅黑";
            }
            .user-comment-content {
                padding-right: 26px;
                box-sizing: border-box;
                flex: 1;
                font-weight: bold;
                font-size: 33px;
                color: #222222;
                font-family: "微软雅黑";
            }
            .user-comment-bottom {
                position: relative;
                display: flex;
                align-items: center;
                margin-top: 27px;
                .user-comment-date {
                    font-size: 19px;
                    color: #222222;
                    line-height: 48px;
                }
            }
        }
        .comment-image {
            width: 72px;
            height: 72px;
        }

        .good-button-container {
            line-height: 0;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 1;
            .good-button {
                height: 30px;
                // vertical-align: baseline;
                .van-button__content {
                    display: block;
                }
            }
            .good-number {
                margin-left: 15px;
                font-size: 19px;
                font-weight: bold;
            }
        }
    }
}
</style>
<style lang="scss">
.comment-item {
    .reply-button {
        margin-left: 24px;
        height: 48px;
        // width: 123px;
        .van-button__text {
            color: #222222;
        }
    }
    .good-button {
        // position: absolute;
        //  right: 39px;
        //  top: 0;
        //  z-index: 1;
        border: 0;
        padding: 0;
        &.liked {
            .van-button__content {
                .van-icon {
                    color: #e5645f;
                }
            }
        }
    }
}
</style>