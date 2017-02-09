<template>
    <div class="play-list-mask">
        <transition name="playerToggle">
            <div class="play-list-box" v-show="PlayerComp.playList.visible">
                <!--scroll-->
                <div class="play-list-box-body-wrapper" id="play-list-box-body-wrapper">
                    <div class="play-list-box-body-scroller" id="play-list-box-body-scroller">
                        <!--current-->
                        <div class="play-list-box-body-box" id="currentPlay">
                            <div class="play-list-box-body-box-head">
                                <div class="play-list-head-btn" @click="toggleType">
                                    <span stop class="play-list-head-btn-icon-playType icon" v-html="PlayerComp.playType==1?'&#xe60c;':''||PlayerComp.playType==2?'&#xe630;':''||PlayerComp.playType==3?'&#xe99e;':''"></span>
                                    <span stop class="play-list-head-btn-text" v-if="PlayerComp.playType==1">随机播放</span>
                                    <span stop class="play-list-head-btn-text" v-if="PlayerComp.playType==2">顺序播放</span>
                                    <span stop class="play-list-head-btn-text" v-if="PlayerComp.playType==3">单曲循环</span>
                                </div>
                                <div class="play-list-head-btn">
                                    <span class="play-list-head-btn-icon icon">&#xe627;</span>
                                    <span class="play-list-head-btn-icon icon">&#xe60b;</span>
                                    <span class="play-list-head-btn-icon icon">&#xe614;</span>
                                </div>
                            </div>
                            <div class="play-list-box-body-box-wrapper" id="currentPlay-wrapper">
                                <div class="play-list-box-body-box-scroller" id="currentPlay-scroller">
                                    <single-list v-for="song in PlayerComp.playList.currentPlayList.list" :Data="song" from="list" :sheetCode="PlayerComp.playList.currentPlayList.sheetCode"></single-list>
                                </div>
                            </div>
                        </div>
                        <!--radio-->
                        <div v-if="PlayerComp.playList.radioList.list.length!=0" class="play-list-box-body-box" id="RadioList">
                            <div class="play-list-box-body-box-head">

                            </div>
                            <div class="play-list-box-body-box-wrapper" id="RadioList-wrapper">
                                <div class="play-list-box-body-box-scroller" id="RadioList-scroller">
                                    <single-list v-for="song in PlayerComp.playList.radioList.list" :Data="song" from="radio" :sheetCode="PlayerComp.playList.radioList.sheetCode"></single-list>
                                </div>
                            </div>
                        </div>
                        <!--history-->
                        <!--todo-->
                        <div v-if="PlayerComp.playList.historyList.list.length!=0" class="play-list-box-body-box" id="historyList">
                            <div class="play-list-box-body-box-head">
                                上次试听列表(82首):歌单·222
                            </div>
                            <div class="play-list-box-body-box-wrapper" id="historyList-wrapper">
                                <div class="play-list-box-body-box-scroller" id="historyList-scroller">
                                    <single-list v-for="song in PlayerComp.playList.historyList.list" :Data="song" from="history" :sheetCode="PlayerComp.playList.historyList.sheetCode"></single-list>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="play-list-box-footer">
                    <div class="play-list-box-point" v-show="PlayerComp.playList.historyList.list.length!=0">
                        <ul class="play-list-point-ul">
                            <li class="play-list-point-li active"></li>
                            <li class="play-list-point-li"></li>
                        </ul>
                    </div>
                    <div class="play-list-box-btn" @click="hidePlayList">关闭</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import publicJs from '../../publicJs/publicJs'
    import singleList from './singleList'
    import {mapActions, mapGetters} from 'vuex'
    export default{
        name: 'playList',
        data(){
            return {
            }
        },
        computed: mapGetters({
            PlayerComp: 'PlayerComp'
        }),
        mounted(){
            publicJs.setIndex('play-list-mask');
            if(this.PlayerComp.playList.currentPlayList.list.length!=0){
                publicJs.initScroll('currentPlay-wrapper','currentPlay-scroller',{scrollX: false, scrollY: true})
                //todo radio history
            }
        },
        watch: {
            'PlayerComp.playList.visible': function (val, oldVal) {
                let El = window.document.getElementsByClassName('play-list-mask')[0];
                //todo may use javascript to control transition components
                El.style.background = 'rgba(0,0,0,0)';
                if (val) {
                    El.style.display = 'block';
                    publicJs.initScroll('play-list-box-body-wrapper', 'play-list-box-body-scroller', {scrollX: true, scrollY: false, momentum: false, snap: true});
                    setTimeout(function () {
                        El.style.background = '';
                    }, 100)
                }else {
                    setTimeout(function () {
                        El.style.display = 'none';
                    }, 500)
                }
                let markA=this.PlayerComp.playList.radioList.list.length!=0;
                let markB=this.PlayerComp.playList.historyList.list.length!=0;
                if(markA&&markB){
                    document.getElementById('play-list-box-body-scroller').style=(750*3)/75+'rem'
                }else if(markA||markB){
                    document.getElementById('play-list-box-body-scroller').style=(750*2)/75+'rem'
                }else if(!markA&&!markB){
                    document.getElementById('play-list-box-body-scroller').style=(750)/75+'rem'
                }
            }
        },
        methods: {
            hidePlayList(){
                let toggle = {
                    PlayerVisible: true
                };
                this.$store.dispatch('playerToggle', {toggle})
            },
            toggleType(){
                this.$store.dispatch('playerTogglePlayType')
                console.log('1111')
            }
        },
        components:{
            singleList
        }
    }
</script>