<template>
<div class="search-history-container">
<van-cell title="搜索历史">
            <span v-if="deleteStatus">
                <span @click="deleteAllHistory">全部删除 </span>
            <span @click="deleteStatus = false">完成</span>
            </span>
            <van-icon name="delete" v-if="!deleteStatus" @click="deleteStatus = true"/>
        </van-cell>
        <van-cell @click="$emit('onSearch',historyItem)" v-for="(historyItem,index) in historyList" :key="index" :title="historyItem">
            <van-icon @click="deleteHistory(historyItem)" name="close" v-if="deleteStatus"/>
        </van-cell>
</div>
</template>
<script>
export default {
    props:{
        historyList:{ type: Array },
        searchText:{ type: String }
    },
    data(){
        return {
            deleteStatus: false
        }
    },
    methods:{
        deleteAllHistory(){
            this.$emit('update:historyList',[])
        },
        deleteHistory(historyItem){
            const getIndex = this.historyList.indexOf(historyItem)
            this.historyList.splice(getIndex, 1)
        }
    }
}
</script>
