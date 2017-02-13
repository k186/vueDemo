<template>
    <transition name="playerToggle">
    <div class="play-list-mask">
            <div class="play-list-box">
                <!--scroll-->
                <div class="play-list-box-body-wrapper" id="play-list-box-body-wrapper">
                    <div class="play-list-box-body-scroller" id="play-list-box-body-scroller">
                        <!--current-->
                        <div class="play-list-box-body-box" id="currentPlay">
                            <div class="play-list-box-body-box-head" v-if="PlayerComp.playList.currentPlayList.sheetCode!='radio'">
                                <div class="play-list-head-btn" @click="toggleType">
                                    <span stop class="play-list-head-btn-icon-playType icon" v-html="PlayerComp.playType==1?'&#xe60c;':''||PlayerComp.playType==2?'&#xe630;':''||PlayerComp.playType==3?'&#xe99e;':''"></span>
                                    <span stop class="play-list-head-btn-text" v-if="PlayerComp.playType==1">随机播放({{PlayerComp.playList.currentPlayList.count}}首)</span>
                                    <span stop class="play-list-head-btn-text" v-if="PlayerComp.playType==2">顺序播放({{PlayerComp.playList.currentPlayList.count}}首)</span>
                                    <span stop class="play-list-head-btn-text" v-if="PlayerComp.playType==3">单曲循环({{PlayerComp.playList.currentPlayList.count}}首)</span>
                                </div>
                                <div class="play-list-head-btn">
                                    <span class="play-list-head-btn-icon icon">&#xe627;</span>
                                    <span class="play-list-head-btn-icon icon">&#xe60b;</span>
                                    <span class="play-list-head-btn-icon icon">&#xe614;</span>
                                </div>
                            </div>
                            <div class="play-list-box-body-box-radio-head" v-if="PlayerComp.playList.currentPlayList.sheetCode=='radio'">
                                <div class="play-list-head-btn">
                                    <div class="play-list-head-btn-title">个性电台</div>
                                    <span class="play-list-head-btn-change-radio" @click="initRadio">换一批</span>
                                </div>
                            </div>
                            <div class="play-list-box-body-box-wrapper" id="currentPlay-wrapper">
                                <div class="play-list-box-body-box-scroller" id="currentPlay-scroller">
                                    <single-list v-for="song in PlayerComp.playList.currentPlayList.list" :playStatus="PlayerComp.playStatus" :currentPlayUid="PlayerComp.currentPlay.uid" :Data="song" :from="PlayerComp.playList.currentPlayList.sheetCode=='radio'?'radio':'list'" :sheetCode="PlayerComp.playList.currentPlayList.sheetCode"></single-list>
                                </div>
                            </div>
                        </div>
                        <!--history-->
                        <div class="play-list-box-body-box" id="historyList" v-if="PlayerComp.playList.historyList.list.length!=0">
                            <div class="play-list-box-body-box-head" v-if="PlayerComp.playList.currentPlayList.sheetCode!='radio'">
                                <div class="play-list-head-btn">
                                    <span class="play-list-head-btn-text">上次试听列表({{PlayerComp.playList.historyList.count}}首):<i class="play-list-head-current-title">歌单•{{PlayerComp.playList.historyList.title}}</i></span>
                                </div>
                            </div>
                            <div class="play-list-box-body-box-wrapper" id="historyList-wrapper">
                                <div class="play-list-box-body-box-scroller" id="historyList-scroller">
                                    <single-list v-for="song in PlayerComp.playList.historyList.list" :playStatus="PlayerComp.playStatus" :currentPlayUid="PlayerComp.currentPlay.uid" :Data="song" from="history" :sheetCode="PlayerComp.playList.historyList.sheetCode"></single-list>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="play-list-box-footer">
                    <div class="play-list-box-point" v-show="PlayerComp.playList.historyList.list.length!=0">
                        <ul class="play-list-point-ul">
                            <li class="play-list-point-li" :class="currentPage==0?'active':''"></li>
                            <li class="play-list-point-li" :class="currentPage==1?'active':''"></li>
                        </ul>
                    </div>
                    <div class="play-list-box-btn" @click="hidePlayList">关闭</div>
                </div>
            </div>
    </div>
    </transition>
</template>
<script>
    import publicJs from '../../publicJs/publicJs'
    import singleList from './singleList'
    import {mapActions, mapGetters} from 'vuex'
    export default{
        name: 'playList',
        computed: mapGetters({
            PlayerComp: 'PlayerComp',
            userData:'userData'
        }),
        data(){
            return{
                currentPage:0,
                myScrollA:null,
                myScrollB:null,
                myScrollC:null,
            }
        },
        mounted(){
            publicJs.setIndex('play-list-mask');
            this.initScroll();
        },
        methods: {
            initScroll(){
                let that=this;
                let markB=this.PlayerComp.playList.historyList.list.length!=0;
                /*init scroll*/
                if(this.PlayerComp.playList.currentPlayList.list.length!=0){
                    this.$nextTick(function () {
                      publicJs.initScroll({wrapper:'currentPlay-wrapper',scroller:'currentPlay-scroller',option:{scrollX: false, scrollY: true},callbackFun:function (scroll) {
                          that.myScrollA=scroll
                      }});
                    });
                }
                /*---scroll end*/
                this.$nextTick(function () {
                    if(markB){
                        document.getElementById('play-list-box-body-scroller').style.width=(750*2)/75+'rem';
                        this.$nextTick(function () {
                            publicJs.initScroll({wrapper:'historyList-wrapper',scroller:'historyList-scroller',option:{scrollX: false, scrollY: true},callbackFun:function (scroll) {
                                that.myScrollB=scroll;
                            }});
                        });
                        publicJs.initScroll({
                            wrapper:'play-list-box-body-wrapper',
                            scroller:'play-list-box-body-scroller',
                            option:{scrollX: true, scrollY: false,momentum: false, snap: true},
                            callbackFun:function (scroll) {
                                that.myScrollC = scroll;
                                that.myScrollC.on('scrollEnd', function () {
                                    that.currentPage = that.myScrollC.currentPage.pageX
                                })
                            }
                        });
                    }else if(!markB){
                        document.getElementById('play-list-box-body-scroller').style.width=(750)/75+'rem';
                    }
                })
            },
            hidePlayList(){
                let toggle = {
                    PlayerVisible: true
                };
                this.$store.dispatch('playerToggle', {toggle})
            },
            toggleType(){
                this.$store.dispatch('playerTogglePlayType');
            },
            initRadio(){
                let that=this;
                that.$store.dispatch('initRadio',{callback:function () {
                    let option={
                        from:'radio'
                    };
                    that.$store.dispatch('playerSet',{option});
                }});
            },
            beforeDestroy(){
                publicJs.destroy(this.myScrollA);
                publicJs.destroy(this.myScrollB);
                publicJs.destroy(this.myScrollC);

            }
        },
        components:{
            singleList
        }
    }
</script>