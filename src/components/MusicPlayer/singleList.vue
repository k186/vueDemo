<template>
    <div class="single-list-box">
        <div class="single-list-text" :class="Data.song.uid==PlayerComp.currentPlay.uid?'playing':''" @click="play(Data.song.uid)">
            <span class="single-list-text-title">{{Data.song.title}}</span>
            <span class="single-list-text-quality">{{Data.song.markTitle.quality}}</span>
            <span class="single-list-text-artist">-&nbsp;{{Data.song.artist}}</span>
        </div>
        <div  class="single-list-control" v-if="type==1">
            <div class="single-list-isPlay" v-if="Data.song.uid==PlayerComp.currentPlay.uid" :class="PlayerComp.playStatus==0?'playing':'pause'"></div>
            <div class="single-list-isLike"><span class="icon" :class="Data.isLike?'like':''" v-html="Data.isLike?'&#xe99f;':'&#xe613;'"></span></div>
            <div class="single-list-delete"><span class="icon">&#xe6bf;</span></div>
        </div>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default{
        name:'singleList',
        computed: mapGetters({
            PlayerComp: 'PlayerComp'
        }),
        props:{
            type:{
                type:Number,
                required:true
            },
            Data:{
                type:Object,
                required:true
            }
        },
        methods:{
            play(uid){
                this.$store.dispatch('playerNext',{uid});
                //todo 把播放方法放到 player js 里面
            }
        }
    }
</script>