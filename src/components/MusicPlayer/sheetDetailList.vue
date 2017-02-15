<template>
    <div class="detail-list-box">
        <div class="detail-list-head">
            <div class="detail-list-head-nav active">单曲</div>
            <div class="detail-list-head-nav">详情</div>
            <div class="detail-list-head-nav">歌词本</div>
            <div class="detail-list-head-nav-bar"></div>
        </div>
        <div class="detail-list-body-wrapper wrapper" id="detail-list-body-wrapper">
            <div class="detail-list-body-list-scroller" id="detail-list-body-list-scroller">
                <div class="detail-list-list-song">
                    <single :DataList="sheetDetailList.list"></single>
                </div>
                <div class="detail-list-list-detail"></div>
                <div class="detail-list-list-lyric"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import publicJs from '../../publicJs/publicJs'
    import single from './listSongSingle'
    export default{
        name:'sheetDetailList',
        components:{
            single
        },
        data(){
            return{
                myScroll:null,
                sheetDetailList:{
                    sheetCode: 2,
                    title: '22223423432',
                    downloaded: 2,
                    count: 4,
                    playHistory: 30,
                    poster: '../../../static/imgs/poster/1232.jpg',
                    author: {
                        name:'k186 Studio',
                        head:''
                    },
                    mark: '', /*介绍*/
                    tags: [1, 2, 3],/*数组映射*/
                    list: [
                        {
                            song: {
                                url: 'http://k186studio.com/static/music/8546.mp3',
                                poster: '../../../static/imgs/poster/8546.jpg',
                                title: 'I Like Chopin',
                                artist: 'Gazebo',
                                album: 'Portrait',
                                uid: 8546, /*用这个去匹配下载列表 HASH 来设置isDownload*/
                                markTitle: {
                                    quality: 1, /*0 normal 1 hq 2 sq */
                                    exclusive: 1, /* 独家 0 1*/
                                    mv: 1/*mv 0 1*/
                                }
                            },
                            mark: {
                                "isDownload": true,
                                "isInternet": true
                            }
                        },
                        {
                            song: {
                                url: 'http://k186studio.com/static/music/8543.mp3',
                                poster: '../../../static/imgs/poster/8543.jpg',
                                title: 'Heroes',
                                artist: 'Alesso',
                                album: 'Heroes (we could be)',
                                uid: 8543, /*用这个去匹配下载列表 HASH 来设置isDownload*/
                                markTitle: {
                                    quality: 1, /*0 normal 1 hq 2 sq */
                                    exclusive: 1, /* 独家 0 1*/
                                    mv: 1/*mv 0 1*/
                                }
                            },
                            mark: {
                                "isDownload": true,
                                "isInternet": true
                            }
                        },
                    ]
                }
            }
        },
        mounted(){
            let that=this;
            publicJs.initScroll({
                wrapper: 'detail-list-body-wrapper',
                scroller: 'detail-list-body-list-scroller',
                option: {scrollX: true, scrollY: false, momentum: false, snap: true},
                callbackFun: function (scroll) {
                    that.myScroll = scroll;
                    that.myScroll.on('scrollEnd', function () {

                    })
                }
            });
        },
    }
</script>