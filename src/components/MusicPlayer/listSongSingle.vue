<template>
    <div>
        <div class="list-song-single-box" v-for="Data in DataList">
            <div class="list-song-single-box-text">
                <div class="list-song-single-box-text-title">
                    <span class="text ">{{Data.song.title}}</span>
                    <span v-if="Data.song.markTitle.quality==2" class="text icon sq">&#xe8a9;</span>
                    <span v-if="Data.song.markTitle.quality==1" class="text icon hq">&#xe8ab;</span>
                    <span v-if="Data.song.markTitle.mv" class="text icon mv">&#xe6af;</span>
                    <span v-if="Data.song.markTitle.exclusive" class="text icon exclusive">&#xe6b0;</span>
                </div>
                <div class="list-song-single-box-text-artist">
                    <i class="icon" :class="Data.mark.isDownload?'active':''">&#xe62a;</i>
                    <i v-if="Data.mark.isInternet" class="icon">&#xe62f;</i>
                    {{Data.song.artist}}
                </div>
            </div>
            <div class="list-song-single-box-btn"><i class="icon">&#xe60a;</i></div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'listSongSingle',
        props:{
            DataList:{
                //type:Array,
                required:true
            }
        }
    }
</script>