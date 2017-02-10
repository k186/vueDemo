<template>
    <div>
        <transition name="playerToggle">
            <div class="player-box" v-show="PlayerComp.visible">
                <div class="player-box-bg">
                    <transition-group class="player-box-currentPlay" tag="div" :name="swipeChange">
                        <div class="player-box-currentPlay-box" :key="PlayerComp.currentPlay.poster" @touchstart="playerTouch($event)" id="playerTouch">
                            <div class="player-box-poster" >
                                <img :class="PlayerComp.playStatus==1?'circleLoop':'circleLoopPause'" v-if="PlayerComp.currentPlay.poster" :src="PlayerComp.currentPlay.poster" alt="海报" class="player-box-poster-img">
                                <img v-if="!PlayerComp.currentPlay.poster" src="../../../static/imgs/poster/defalut.png" alt="海报" class="player-box-poster-img">
                            </div>
                            <div class="player-box-text">
                                <div v-show="!PlayerComp.currentPlay.title" class="player-box-text-title">QQ音乐</div>
                                <div v-show="PlayerComp.currentPlay.title" class="player-box-text-title">{{PlayerComp.currentPlay.title}}</div>
                                <div class="player-box-text-lyric"></div>
                            </div>
                        </div>
                    </transition-group>
                    <div class="player-box-btn">
                        <i v-if="PlayerComp.playStatus==0" class="player-box-btn-play icon" @click="play">&#xe675;</i>
                        <i v-if="PlayerComp.playStatus==1" class="player-box-btn-play icon" @click="pause">&#xe6ab;</i>
                        <i class="player-box-btn-playList icon" @click="showPlayList">&#xe841;</i>
                    </div>
                </div>
            </div>
        </transition>
        <play-list v-if="PlayerComp.playList.visible"></play-list>
        <audio id="audio" :src="PlayerComp.currentPlay.url"></audio>
    </div>
</template>
<script>
    import playList from './playList'
    import {mapActions, mapGetters} from 'vuex'
    export default{
        name: 'player',
        components:{
            playList
        },
        data(){
            return {
                playOrder: [],
                currentIndex: 0,
                swipeChange:'',
                bufferedPercent:0,
                touchData:{
                    startTimeStamp:0,
                    startPointX:0,
                    endPointX:0,
                    endTimeStamp:0
                }
            }
        },
        computed: mapGetters({
            PlayerComp: 'PlayerComp'
        }),
        mounted(){
            this.$store.dispatch('playerInit');
            //todo init play list
        },
        methods: {
            play(){
                this.$store.dispatch('playerPlay');
            },
            pause(){
                this.$store.dispatch('playerPause');
            },
            next(){
                this.swipeChange='right2left';
                this.$store.dispatch('playerNext');
            },
            previous(){
                this.swipeChange='left2right';
                this.$store.dispatch('playerPrevious');
            },
            /*滑动手势*/
            //todo  set custom directive todo
            playerTouch(e){
                if(this.PlayerComp.currentPlay.url){
                    let that=this;
                    let El=document.getElementById('playerTouch');
                    El.addEventListener('touchmove',that.playerTouchMove,false);
                    El.addEventListener('touchend',that.playerTouchEnd,false);
                    let finger=e.changedTouches[0];
                    that.touchData.startPointX=finger.pageX;
                    that.touchData.startTimeStamp=Date.now();
                    e.preventDefault();
                    console.log('touch')
                }
            },
            playerTouchMove(e){
                let that=this;
                let finger=e.changedTouches[0];
                that.touchData.endPointX=finger.pageX;
                that.touchData.endTimeStamp=Date.now();
                e.preventDefault();
                console.log('move')
            },
            playerTouchEnd(e){
                let that=this;
                let El=document.getElementById('playerTouch');
                let finger=e.changedTouches[0];
                that.touchData.endPointX=finger.pageX;
                that.touchData.endTimeStamp=Date.now();
                let time=that.touchData.endTimeStamp-that.touchData.startTimeStamp;
                let distance=that.touchData.endPointX-that.touchData.startPointX;
                let direction=true;/*true to right(next) false to left*/
                direction=distance>0;
                if(time<300){
                    if(Math.abs(distance)>=150){
                        if(direction){
                            that.$nextTick(function () {
                                that.previous();
                            })
                        }else {
                            that.$nextTick(function () {
                                that.next();
                            })
                        }
                    }
                }
                e.preventDefault();
                El.removeEventListener('touchemove',that.playerTouchMove);
                El.removeEventListener('touchend',that.playerTouchEnd);
                console.log('touchEnd')
            },
            showPlayList(){
                let toggle={
                    PlayerVisible:false
                };
                this.$store.dispatch('playerToggle',{toggle})
            }
        }
    }
</script>