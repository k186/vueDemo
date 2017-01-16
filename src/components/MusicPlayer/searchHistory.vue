<template>
    <div class="history-BG" id="wrapper">
        <div id="scroller" class="hot-search-bg">
            <div class="hot-search">
                <div class="hot-title">热门搜索</div>
                <div class="hot-tags">
                    <span class="hot-tag active">标签1</span>
                    <span class="hot-tag">标签2</span>
                    <span class="hot-tag">标签3</span>
                    <span class="hot-tag">标签3</span>
                    <span class="hot-tag">标签3</span>
                    <span class="hot-tag">标签3</span>
                    <span class="hot-tag">标</span>
                    <span class="hot-tag">标签3</span>
                    <span class="hot-tag">标</span>
                    <span class="hot-tag">标签3</span>
                    <span class="hot-tag">标签3</span>
                    <span class="hot-tag">标签3</span>
                </div>
            </div>
            <div class="history-list" style="height: 9000px">
                <div class="list-btn">
                    <div class="list-title">搜索历史</div>
                    <div class="list-clear">清空历史</div>
                </div>
                <div>
                    <div class="list-box">
                        <div>名字</div>
                        <div class="icon list-clear-btn">X</div>
                    </div>
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
    import publicJs from  '../../publicJs/publicJs'
    export default{
        name:'searchHistory',
        mounted(){
            publicJs.initScroll();
            $('.list-box')
        },
        methods:{
            updateHistory(){
                $('.list-box')
            }
        }
    }
</script>