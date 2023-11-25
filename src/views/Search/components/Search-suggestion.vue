<template>
    <div class="search-suggestion-container">
        <!-- $emit('update:searchText',suggestionItem) -->
        <div
            @click="clickSuggestion(suggestionItem)"
            v-for="(suggestionItem, index) in suggestionList"
            :key="index"
            class="search-help-item"
        >
            <div class="logo-word">
                <i class="icon-12 icon"></i>
                <span
                    class="text"
                    v-html="WordchangeColor(suggestionItem)"
                ></span>
            </div>
        </div>
    </div>
</template>
<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
    props: {
        searchText: {type:String},
    },
    data() {
        return {
            suggestionList: [],
        };
    },
    methods: {
        clickSuggestion(val){
            this.$emit('onSearch',val)
        },
        async loadSearchSuggestion() {
            const { data } = await getSearchSuggestion(this.searchText);
            if(data.options.length == 1 && data.options[0] == null)return
            this.suggestionList = data.options;
            // console.log(data);
        },
        WordchangeColor(suggestionItem) {
            // console.log(this.suggestionList)
            // if(!suggestionItem)return
            // console.log("data=", this.searchText);
                  const reg = new RegExp(this.searchText, "gi");
            // console.log(`<span>${suggestionItem.replace(reg,suggestionItem)}</span>`)
            return suggestionItem.replace(
                reg,
                `<span class="active">${this.searchText}</span>`
            );
          
        },
    },
    watch: {
        searchText: {
            immediate: true,

            handler: debounce(function (newValue) {
                this.loadSearchSuggestion();
            }, 1000),
        },
    },
};
</script>
<style lang="scss" scoped>
.search-suggestion-container {
    margin-top: 9px;

    .search-help-item {
        box-sizing: border-box;
        padding: 29px 0 31px 25px;
        background-color: #ffffff;
        height: 85px;
        display: flex;
        align-items: center;
        &:not(:last-child) {
            margin-bottom: 1px;
        }
        .logo-word {
            display: flex;
            .icon {
                color: #d4d4d4;
                font-size: 25px;
                margin-right: 18px;
                line-height: 72px;
            }
            .text {
                font-family: "微软雅黑";
                font-size: 25px;
                // vertical-align: middle;
                line-height: 64px;
           
            }
        }
    }
}
</style>
<style lang="scss">
.search-suggestion-container {
    .search-help-item {
        .logo-word {
            .text {
                .active {
                    color: #3296fa ;
                }
            }
        }
    }
}
</style>