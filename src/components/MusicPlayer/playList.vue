<template>
    <div class="play-list-mask">
        <transition name="history">
            <div class="play-list-box">
                <div class="play-list-box-wrapper">
                    <div class="play-list-box-scroller">
                        <div class="play-list-box-A">
                            <div class="play-list-box-head">
                                <div class="play-list-box-head-btn">
                                    <div v-if="playList.playType==2" class="play-list-box-head-btn-playTypes">
                                        <div class="icon play-list-box-head-btn-playType">&#xe60c;</div>
                                        <div class="play-list-box-btn-head-text">随机播放({{playList.current.count}}首)</div>
                                    </div>
                                    <div v-if="playList.playType==1" class="play-list-box-head-btn-playTypes">
                                        <div class="icon play-list-box-head-btn-playType">&#xe630;</div>
                                        <div class="play-list-box-btn-head-text">顺序播放({{playList.current.count}}首)</div>
                                    </div>
                                    <div v-if="playList.playType==3" class="play-list-box-head-btn-playTypes">
                                        <div class="icon play-list-box-head-btn-playType">&#xe99e;</div>
                                        <div class="play-list-box-btn-head-text">单曲循环</div>
                                    </div>
                                </div>
                                <div class="play-list-box-head-btn-function">
                                    <div class="play-list-box-head-btn-addDownloadDelete icon">&#xe627;</div>
                                    <div class="play-list-box-head-btn-addDownloadDelete icon">&#xe60b;</div>
                                    <div class="play-list-box-head-btn-addDownloadDelete icon">&#xe614;</div>
                                </div>
                            </div>
                            <div class="play-list-box-body">
                                23432423423432
                            </div>
                        </div>
                        <div class="play-list-box-A">
                            <div class="play-list-box-head">
                                2343242dfdfsdfs
                            </div>
                            <div class="play-list-box-body">423432432</div>
                        </div>
                    </div>
                </div>
                <div class="play-list-box-footer">
                    <div class="play-list-box-point">
                        <ul>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="play-list-box-btn">关闭</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import publicJs from '../../publicJs/publicJs'
    export default{
        name:'playList',
        data(){
          return {
              playList:{
                  playType:1,/* 1 order 2 random 3 loop */
                  current:{
                      count:552,
                      listData:[],
                  },
                  last:{
                      count:553,
                      listData:[],
                  }
              }
          }
        },
        mounted(){
            publicJs.setIndex('play-list-mask')
        }

    }
</script>