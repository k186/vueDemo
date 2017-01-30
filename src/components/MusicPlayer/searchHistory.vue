<template>
    <div class="history-BG wrapper" id="history-wrapper">
        <div id="history-scroller" class="hot-search-bg scroller">
            <div class="hot-search">
                <div class="hot-title">热门搜索</div>
                <div class="hot-tags">
                    <span class="hot-tag" v-for="tag,index in history.hotData" :class="index==0?'active':''">{{tag.value}}</span>
                </div>
            </div>
            <div class="history-list">
                <div class="list-btn">
                    <div class="list-title">搜索历史</div>
                    <div class="list-clear" @click="clearHistory('all')">清空历史</div>
                </div>
                <div>
                    <div class="list-box" v-for="list,index in history.historyData">
                        <div class="list-box-title">{{list.value}}</div>
                        <div class="icon list-clear-btn" @click="clearHistory('',index)">&#xe6bf;</div>
                    </div>
                </div>
            </div>
            <div class="Scroll-Add-On"></div>
        </div>
    </div>
</template>
<script>
    import publicJs from  '../../publicJs/publicJs'
    import {mapGetters, mapActions} from 'vuex'
    export default{
        name: 'searchHistory',
        computed: mapGetters({
            history: 'searchHistory'
        }),
        mounted(){
            publicJs.initScroll('history-wrapper','history-scroller');
        },
        methods: {
            updateHistory(){

            },
            search(){

            },
            clearHistory(type, index){
                if (type == 'all') {
                    let searchHistory = {
                        historyData: [],
                    };
                    this.$store.dispatch('updateHistory', {searchHistory})
                } else {
                    if (index !== null && index !== undefined && index !== '') {
                        let newArr = [];
                        for (let i = 0; i < this.history.historyData.length; i++) {
                            if (i !== index) {
                                newArr.push(this.history.historyData[i])
                            }
                        }
                        let searchHistory = {
                            historyData: newArr,
                        };
                        this.$store.dispatch('updateHistory', {searchHistory})
                    }
                }
                publicJs.refresh();
            }
        }
    }
</script>