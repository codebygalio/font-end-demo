<template>
    <div class="search-container">
        <!-- 搜索栏 -->
        <form action="/" class="form-container">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                background="#3296fa"
                class="top-search"
                @focus="isResultShow = false"
                fixed
            >
                <template #action>
                    <div @click="onCancel" class="text">取消</div>
                </template>
            </van-search>
        </form>
        <!-- 搜索结果 -->
        <search-result v-if="isResultShow" :searchText="searchText"/>
           <!-- 联想建议 -->
        <search-suggestion @onSearch="onSearch"  :searchText.sync="searchText" v-else-if="searchText"/>
        <!-- 搜索历史 -->
        <search-history @onSearch="onSearch" :historyList.sync="historyList" v-else/>
        
     
        
    </div>
</template>
<script>
import SearchHistory from './components/Search-history'
import SearchResult from './components/Search-result'
import SearchSuggestion from './components/Search-suggestion'
import {mapState} from 'vuex'
import {getItem, setItem} from '@/utils/storage'

export default {
    name: "Search",
    components:{
        SearchHistory,
        SearchResult,
        SearchSuggestion
    },
    data() {
        return {
            isResultShow: false,     
            searchText: "",    
            historyList: getItem('history') || []  
        };
    },
    computed:{
        ...mapState(['user'])
    },

    watch:{
        historyList(newHistoryList){
            setItem('history',newHistoryList)
        }
    },
    methods: {
   
        onSearch(val) {
            this.isResultShow = true
            this.searchText = val
            if(this.user.userTokens){
                
            }else{
                const getIndex = this.historyList.indexOf(val)
                if(getIndex == -1){
                     this.historyList.unshift(val)
                }else{
                    this.historyList.splice(getIndex,1)
                    this.historyList.unshift(val)
                    
                }
            }
            
        },
        onCancel(){
            this.$router.back()
        }
    },
};
</script>

<style lang="scss" scoped>
.search-container {
    height: 100%;
    background-color: #f5f7f9;
    .form-container{
         position: fixed;
        top: 0;
        z-index: 1;
.top-search {
        box-sizing: border-box;
        height: 97px;
        padding: 24px 38px 17px 38px;
        .text {
            font-size: 28px;
            font-family: "微软雅黑";
            color: #ffffff;
            margin-left: 33px;
        }
    }
    }
    
    
}
</style>
<style lang="scss">
.search-container {
     padding-top: 97px;
   
       
        .top-search {
        .van-search__action {
            padding: 0px;
            &:active{
                background-color: unset !important;
            }
        }
        .van-search__content.van-search__content--square {
            width: 589px;
            height: 56px;
        }
        .van-search__content {
            padding-left: 17px;
        }
        .van-cell {
            padding: 0;
            .van-field__body{
                i.van-icon.van-icon-clear.van-field__clear{
                    display: none;
                }
            }
        }
        .van-cell.van-cell--borderless.van-field {
            display: flex;
            justify-content: center;
            align-items: center;
            .van-field__left-icon {
                margin-right: 16px;
                .van-icon.van-icon-search {
                    font-size: 28px;
                    color: #9a9a9a;
                }
            }
        }
        .van-field__control {
            color: #333333;
            font-size: 25px;
            font-family: "微软雅黑";
        }
    }
    
    
}
</style>