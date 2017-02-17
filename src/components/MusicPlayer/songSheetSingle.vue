<template>
    <div class="song-sheet-box-list">
        <router-link :to="'/Music/'+$route.params.userToken+'/detailList/'+data.sheetCode+'/'+from" class="song-sheet-box-list-item" v-for="data in listData">
            <img :src="data.poster!=''?data.poster:'../../../static/music/poster/default.jpg'" class="song-sheet-box-list-item-poster">
            <div class="song-sheet-box-list-item-text">
                <div class="song-sheet-box-list-item-text-box">
                    <div class="song-sheet-box-list-item-text-title">{{data.title}}</div>
                    <div v-if="data.downloaded==0" class="song-sheet-box-list-item-text-described">
                        <span>{{data.count}}首</span>
                    </div>
                    <div v-if="data.count!=data.downloaded&&data.downloaded!=0" class="song-sheet-box-list-item-text-described">
                        <span class="icon">&#xe6ae;</span><span>{{data.count}}首,{{data.downloaded}}首已下载</span>
                    </div>
                    <div v-if="data.count==data.downloaded" class="song-sheet-box-list-item-text-described">
                        <span class="icon">&#xe62a;</span><span>{{data.count}}首,全部下载</span>
                    </div>
                </div>
                <div class="song-sheet-box-list-item-btn icon">&#xe639;</div>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default{
        name:'songSheetSingle',
        props:{
            listData:{
                type:Array,
                required:true
            },
            from:{
                required:true
            }
        }
    }
</script>