<template>
    <div class="article-container">
        <!-- 导航栏 -->
        <van-nav-bar
            left-arrow
            @click-left="$router.back()"
            class="nav-bar"
            fixed
        >
            <van-icon slot="right" name="ellipsis" class="right-icon" />
        </van-nav-bar>
        <!-- loading -->
        <van-loading v-if="loading" vertical color="#3296fa" class="loading"
            >加载中</van-loading
        >

        <!-- 文章 -->
        <div class="article-info" v-else-if="article.title">
           <div class="owner-info">
             <div class="title">
                {{ article.title }}
            </div>
            <div class="user-info">
                <div class="left-site">
                    <div class="avatar">
                        <van-image fit="cover" :src="article.aut_photo" round />
                    </div>
                    <div class="name-time">
                        <div class="name">{{ article.aut_name }}</div>
                        <div class="time">
                            {{ article.pubdate | relativeTime }}
                        </div>
                    </div>
                </div>
                <div class="right-site subscribe">
                    <following-button v-model="article.is_followed" :aut_id="article.aut_id"  />
                </div>
            </div>
            <div class="article">
                <div
                    class="markdown-body"
                    v-html="article.content"
                    ref="article-content"
                ></div>
            </div>
           </div>
            <!-- 用户评论 -->
            <commentList @replay-click="onRplayClick" :commentList="commentList" @total_count="total_count = $event" :source="article.art_id"/>
        </div>
        <!-- 404 加载失败  -->
        <div v-else-if="errStatus == 404" class="error-wrap">
            <van-icon name="failure" />
            <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- 其它 加载失败  -->
        <div v-else class="error-wrap">
            <van-icon name="failure" class="failure-icon" />
            <p class="text">内容加载失败！</p>
            <van-button @click="loadArticle" class="retry-btn"
                >点击重试</van-button
            >
        </div>

        <!-- 底部固定 -->
        <div class="fix-bottom" v-if="article.title">
            <div class="comment-icons">
                <!-- <span class="comment"> -->
                    <van-button
            class="comment"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
                <!-- </span> -->
                <div class="icons">
                    <van-icon name="other-pay" class="icon" :badge="total_count" />
                    <collect-article class="icon" :aut_id="article.aut_id" v-model="article.articleis_collected"/>
                    <like-article class="icon" :articleId="article.art_id" v-model="article.attitude"/>
                    <!-- <van-icon class="icon-9 icon" /> -->
                    <van-button class="icon" icon="revoke" @click="$router.back()"/> 
                    <!-- <span class="icon-uniE900"></span>
        <span class="icon-6" badge="9"></span>
        <span class="icon-9"></span>
        <span class="icon-1"></span> -->
                </div>
            </div>
        </div>
        <!-- 评论回复 -->
        <van-popup  v-model="isReplyShow" style="height:100%" position="bottom" >
            <commentReply :articleId="articleId"  v-if="isReplyShow" :comment="currentComment" @closeCommentReplay="isReplyShow=false"/>
        </van-popup>

            <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom" >
            <commentPost :target="article.art_id" @closePopup="closePopup"/>
        </van-popup>

    </div>
</template>
<script>
import { getArticleById } from "@/api/article";
import { ImagePreview } from "vant";
import followingButton from '@/components/following-button'
import collectArticle  from '@/components/collect-article/index.vue'
import likeArticle from '@/components/like-article/index.vue'
import commentList from './components/comment-list'
import commentPost from './components/comment-post'
import commentReply from './components/comment-reply.vue'
import { computed } from 'vue'

export default {
    name: "Article",
    components:{
        followingButton,
        collectArticle,
        likeArticle,
        commentList,
        commentPost,
        commentReply
    },
    provide: function () {
  return {
    // this.article.art_id
    articleId: computed(()=> this.article.art_id ) 
  }
},
    props: {
        articleId: { required: true, type: [String, Number] },
    },
    data() {
        return {
            isReplyShow:false,
            commentList:[],
            currentComment:{},
            isPostShow:false,
            errStatus: 0,
            loading: true,
            article: {},
            total_count:0
        };
    },
    created() {
        this.loadArticle();
    },
    methods: {
        onRplayClick(comment){
            this.currentComment = comment
            this.isReplyShow = true
            console.log(comment)
        },
        closePopup(newCommemt){
            this.isPostShow=false
            this.commentList.unshift(newCommemt)
        },
        async loadArticle() {
            this.loading = true;
            try {
                const { data } = await getArticleById(this.articleId);
                // if (Math.random() > 0.5) {
                //     JSON.parse("qewqe");
                // }
                this.article = data;
                setTimeout(() => {
                    this.previewImage();
                }, 0);
                // console.log(data);
            } catch (err) {
                if (!err) return;
                if (err.status == 404) {
                    this.errStatus = 404;
                }
                this.$toast("请求失败，请再重试");
            }
            this.loading = false;
        },
        previewImage() {
            const articleContent = this.$refs["article-content"];
            const imgs = articleContent.querySelectorAll("img");
            const images = [];
            // console.log(imgs)
            imgs.forEach((img, index) => {
                images.push(img.src);
                img.onclick = () => {
                    ImagePreview({
                        images,
                        startPosition: index,
                    });
                };
            });

            console.log(images);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "./github-markdown.css";
// 208
.article-container {
    box-sizing: border-box;
    padding-top:97px;
    height: 100%;
    padding-bottom:88px;

    .article-info {
        box-sizing: border-box;
        height: 86.13vh;
        overflow-y: scroll;
        padding-top: 48px;
        padding-bottom: 6px;

        // padding: 48px 39px 0px 29px;
        .owner-info{
            padding:0 39px 0 29px;
               .title {
            margin-bottom: 57px;
            font-size: 40px;
            font-size: "微软雅黑";
            font-weight: bold;
            color: #3a3a3a;
        }
        .user-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 67px;
            align-items: center;
            .left-site {
                display: flex;
                align-items: center;
                .avatar {
                    width: 70px;
                    height: 70px;
                    margin-right: 18px;
                    .van-image {
                        width: 100%;
                        height: 100%;
                    }
                }
                .name-time {
                    .name {
                        font-size: 25px;
                        color: #333333;
                    }
                    .time {
                        margin-top: 7px;
                        font-size: 25px;
                        color: #b7b7b7;
                    }
                }
            }
        }
        .article {
            padding: 0 43px 998px 41px;
            
        }

        }
     
        
    }

    .fix-bottom {
        position: fixed;
        z-index: 2;
        left: 0;
        right: 0;
        bottom: 0;
        border-top: solid 1px #d8d8d8;
        box-sizing: border-box;
        height: 97px;
        padding: 20px 39px 0 36px;
        .comment-icons {
            display: flex;
            width: 100%;
            .comment {
                // margin-bottom: ;
                box-sizing: border-box;
                width: 399px;
                height: 64px;
                border: 2px solid #eeeeee;
                margin-right: 76px;
                font-size: 28px;
                color: #a7a7a7;
            
            }
            .icons {
                flex: 1;
                display: flex;
                justify-content: space-between;
            }
         
        }
    }
}
</style>
<style lang="scss">
.article-container {
    box-sizing: border-box;
    .nav-bar {
        box-sizing: border-box;
        background-color: #3296fa;
        height: 97px;
        padding-left: 20px;
        padding-right: 26px;
        left: 0;
        right: 0;
        .van-nav-bar__left,
        .van-nav-bar__right {
            padding: 0;
        }
        .van-icon.van-icon-arrow-left.van-nav-bar__arrow {
            font-size: 36px;
            color: #ffffff;
        }
        .right-icon {
            font-size: 42px;
            color: #ffffff;
        }
    }
    .loading {
        height: 100%;
        display: flex;
        justify-content: center;
        align-content: center;
    }
 
    .user-info {
        .no-subscribe{
            .van-button__text {
                 
                    color: #ffffff;
                }
        }
        .right-site.subscribe {
            width: 170px;
            height: 58px;
            display: flex;
            align-items: center;
            .van-button {
                width: 100%;
                height: 100%;
                .van-button__text {
                    font-size: 28px;
                    font-family: "微软雅黑";
                }
            }
        }
    }
    .error-wrap {
        padding: 200px 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        .failure-icon {
            font-size: 122px !important;
            color: #b4b4b4;
        }
        .text {
            font-size: 30px;
            color: #666666;
            margin: 33px 0 46px;
        }
        .retry-btn {
            width: 280px;
            height: 70px;
            line-height: 70px;
            border: 1px solid #c3c3c3;
            font-size: 30px;
            color: #666666;
        }
    }

    .fix-bottom {
        background-color: #ffffff;
        .comment {
       .van-button__text{
        position: absolute;
        left: 27px;
       }
            }
        .icons {
           .van-icon-other-pay{
            transform: translateY(-5px);
           }
            .icon {
                            border: none;
                        padding: 0;
                        height: 40px;
                        // line-height: 40px;
      color: #777777;
                // font-size: 43px;
                .van-info {
                    min-width: 26px;
                    height: 26px;
                    font-size: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial;
                    top: 6px;
                    padding: 0;
                    border: 0;
                }
            }
        }
    }
}
</style>