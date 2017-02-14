<template>
    <div class="single-list-box">
        <div class="single-list-text" :class="Data.song.uid==currentPlayUid?'playing':''" @click="play({option:{uid:Data.song.uid,sheetCode:sheetCode,from:from}})">
            <span class="single-list-text-title">{{Data.song.title}}</span>
            <span class="single-list-text-quality">{{Data.song.markTitle.quality}}</span>
            <span class="single-list-text-artist">-&nbsp;{{Data.song.artist}}</span>
        </div>
        <div class="single-list-control" v-if="from=='list'">
            <div class="single-list-isPlay" v-if="Data.song.uid==currentPlayUid">
                <play-animation :isPlay="playStatus"></play-animation>
            </div>
            <div class="single-list-isLike" @click.stop.prevent="isLike({uid:Data.song.uid})">
                <span class="icon" :class="isLikeFilter(Data.song.uid)?'like':''" v-html="isLikeFilter(Data.song.uid)?'&#xe99f;':'&#xe613;'"></span>
            </div>
            <div class="single-list-delete" @click.stop.prevent="deleteSingleInPlayList({uid:Data.song.uid})">
                <span class="icon">&#xe6bf;</span>
            </div>
        </div>
        <div class="single-list-control-list" v-if="from=='radio'">
            <div class="single-list-isPlay" v-if="Data.song.uid==currentPlayUid">
                <play-animation :isPlay="playStatus"></play-animation>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import playAnimation from './playingAnimation'
    export default{
        name: 'singleList',
        props: {
            from: {
                required: true
            },
            Data: {
                type: Object,
                required: true
            },
            sheetCode: {
                required: true
            },
            playStatus: {
                required: true
            },
            currentPlayUid: {
                required: true
            }
        },
        components:{
            playAnimation
        },
        methods: {
            ...mapActions({
                isLike: 'updateFilter',
                isLikeFilter: 'isLikeFilter',
                deleteSingleInPlayList: 'deleteSingleInPlayList',
                play: 'playerSet'
            })
        },
    }
</script>