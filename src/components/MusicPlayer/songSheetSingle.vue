<template>
    <div class="song-sheet-box-list">
        <div class="song-sheet-box-list-item" v-for="data in listData.list">
            <img :src="data.poster" class="song-sheet-box-list-item-poster">
            <div class="song-sheet-box-list-item-text">
                <div class="song-sheet-box-list-item-text-box">
                    <div class="song-sheet-box-list-item-text-title">{{data.title}}</div>
                    <div v-if="data.count!=data.download" class="song-sheet-box-list-item-text-described">
                        <span class="icon"></span><span>{{data.count}}首,{{data.download}}首已下载</span>
                    </div>
                    <div v-if="data.count==data.download" class="song-sheet-box-list-item-text-described">
                        <span class="icon"></span><span>{{data.count}}首,全部下载</span>
                    </div>
                </div>
                <div class="song-sheet-box-list-item-btn icon">&#xe639;</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'songSheetSingle',
        props:{
            listData:{
                type:Object,
                required:true
            }
        }
    }
</script>