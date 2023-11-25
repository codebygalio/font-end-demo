<template>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        class="comment-list-container"
        :immediate-check="false"
    >
        <commentItem
            @replay-click="$emit('replay-click', $event)"
            v-for="(comment, index) in commentList"
            :key="index"
            :comment="comment"
        />
    </van-list>
</template>
<script>
import { getComment } from "@/api/comments.js";
import commentItem from "@/components/comment-item/index.vue";
export default {
    components: {
        commentItem,
    },
    props: {
        type: {
            type: String,
            validator(value) {
                return ["a", "c"].includes(value);
            },
            default: "a",
        },
        source: { type: String },
        commentList: { type: Array, default: () => [] },
    },
    data() {
        return {
            loading: false,
            finished: false,
            offset: null,
        };
    },
    created() {
        this.onLoad();
    },
    methods: {
        async onLoad(limit) {
            // console.log('limit=',limit)
            this.loading = true;
            try {
                const { data } = await getComment({
                    type: this.type,
                    source: this.source,
                    offset: this.offset,
                    limit: limit,
                });
                this.commentList.push(...data.results);
                if (data.results.length < 10) {
                    this.finished = true;
                    if (data.results.length > 0) {
                        this.offset = data.last_id;
                        // console.log('this.offset=',this.offset)
                        this.$emit("total_count", data.total_count);
                    }
                }
                // console.log(data)
            } catch (err) {
                this.$toast("请求失败,请稍后重试");
            }
            this.loading = false;
            // this.loading = true
        },
    },
};
</script>
