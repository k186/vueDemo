<template>
    <div class="play-list-mask">
        <transition name="playerToggle">
            <div class="play-list-box" v-show="PlayerComp.playList.visible">
                <!--scroll-->
                <div class="play-list-box-body-wrapper" id="play-list-box-body-wrapper">
                    <div class="play-list-box-body-scroller" id="play-list-box-body-scroller">
                        <!--current-->
                        <div class="play-list-box-body-box" v-if="PlayerComp.playList.type==1" id="currentPlay">
                            <div class="play-list-box-body-box-head">
                                <div class="play-list-head-btn">
                                    <span class="play-list-head-btn-icon icon" v-html="PlayerComp.playType==1?'&#xe60c;':''||PlayerComp.playType==2?'&#xe630;':''||PlayerComp.playType==3?'&#xe99e;':''"></span>
                                    <span class="play-list-head-btn-text" v-if="PlayerComp.playType==1">随机播放</span>
                                    <span class="play-list-head-btn-text" v-if="PlayerComp.playType==2">顺序播放</span>
                                    <span class="play-list-head-btn-text" v-if="PlayerComp.playType==3">单曲循环</span>
                                </div>
                                <div class="play-list-head-btn">
                                    <span class="play-list-head-btn-icon icon">&#xe627;</span>
                                    <span class="play-list-head-btn-icon icon">&#xe60b;</span>
                                    <span class="play-list-head-btn-icon icon">&#xe614;</span>
                                </div>
                            </div>
                            <div class="play-list-box-body-box-wrapper" id="currentPlay-wrapper">
                                <div class="play-list-box-body-box-scroller" id="currentPlay-scroller">
                                    <single-list v-for="song in PlayerComp.playList.list" :Data="song" :type="1"></single-list>
                                </div>
                            </div>
                        </div>
                        <!--radio-->
                        <div class="play-list-box-body-box" v-if="PlayerComp.playList.type==2" id="RadioList">
                            <div class="play-list-box-body-box-head">

                            </div>
                            <div class="play-list-box-body-box-wrapper" id="RadioList-wrapper">
                                <div class="play-list-box-body-box-scroller" id="RadioList-scroller">

                                </div>
                            </div>
                        </div>
                        <!--history-->
                        <div class="play-list-box-body-box" id="historyList">
                            <div class="play-list-box-body-box-head">
                                上次试听列表(82首):歌单·222
                            </div>
                            <div class="play-list-box-body-box-wrapper" id="historyList-wrapper">
                                <div class="play-list-box-body-box-scroller" id="historyList-scroller">
                                    <single-list v-for="song in PlayerComp.playList.historyList" :Data="song" :type="3"></single-list>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="play-list-box-footer">
                    <div class="play-list-box-point">
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
            publicJs.initScroll('currentPlay-wrapper','currentPlay-scroller',{scrollX: false, scrollY: true})
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
            }
        },
        methods: {
            hidePlayList(){
                let toggle = {
                    PlayerVisible: true
                };
                this.$store.dispatch('playerToggle', {toggle})
            }
        },
        components:{
            singleList
        }
    }
</script>