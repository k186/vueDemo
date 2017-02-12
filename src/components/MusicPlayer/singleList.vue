<template>
    <div class="single-list-box">
        <div class="single-list-text" :class="Data.song.uid==PlayerComp.currentPlay.uid?'playing':''" @click="play(Data.song.uid)">
            <span class="single-list-text-title">{{Data.song.title}}</span>
            <span class="single-list-text-quality">{{Data.song.markTitle.quality}}</span>
            <span class="single-list-text-artist">-&nbsp;{{Data.song.artist}}</span>
        </div>
        <div  class="single-list-control"  v-if="from=='list'">
            <div class="single-list-isPlay" v-if="Data.song.uid==PlayerComp.currentPlay.uid" :class="PlayerComp.playStatus==0?'pause':'playing'">@</div>
            <div class="single-list-isLike" @click.stop.prevent="isLike(Data.song.uid)"><span class="icon" :class="isLikeFilter(Data.song.uid)?'like':''" v-html="isLikeFilter(Data.song.uid)?'&#xe99f;':'&#xe613;'"></span></div>
            <div class="single-list-delete" @click.stop.prevent="deleteFromPlayList(Data.song.uid)"><span class="icon">&#xe6bf;</span></div>
        </div>
        <div  class="single-list-control-list"  v-if="from=='radio'">
            <div class="single-list-isPlay" v-if="Data.song.uid==PlayerComp.currentPlay.uid" :class="PlayerComp.playStatus==0?'pause':'playing'">@</div>
        </div>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    export default{
        name:'singleList',
        computed: mapGetters({
            PlayerComp: 'PlayerComp',
            userData:'userData'
        }),
        props:{
            from:{
                required:true
            },
            Data:{
                type:Object,
                required:true
            },
            sheetCode:{
                required:true
            }
        },
        methods:{
            play(uid){
                let option={
                    uid:uid,
                    sheetCode:this.sheetCode,
                    from:this.from
                };
                this.$store.dispatch('playerSet',{option});
            },
            isLikeFilter(uid){
                let Data=this.userData.basicInfo.favourite.uidFilter;
                return !!Data[uid]
            },
            isLike(uid){
                let uidFilter=this.userData.basicInfo.favourite.uidFilter;
               if(uidFilter[uid]||uidFilter[uid]==false){
                   uidFilter[uid]=!uidFilter[uid];
                   this.$store.dispatch('updateFilter',{uidFilter})
               }else if(uidFilter[uid]==undefined){
                   uidFilter[uid]=true;
                   this.$store.dispatch('updateFilter',{uidFilter})
               }
            },
            deleteFromPlayList(uid){
                this.$store.dispatch('deleteSingleInPlayList',{uid})
            }
        }
    }
</script>