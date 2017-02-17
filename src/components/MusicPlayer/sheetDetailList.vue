<template>
    <div class="detail-list-box">
        <div class="detail-list-head">
            <ul class="detail-list-head-ul">
                <li class="detail-list-head-nav" :class="currentPage==0?'active':''" @click="setCurrentPage(0)">单曲</li>
                <li class="detail-list-head-nav" :class="currentPage==1?'active':''" @click="setCurrentPage(1)">详情</li>
                <li class="detail-list-head-nav" :class="currentPage==2?'active':''" @click="setCurrentPage(2)">歌词本</li>
            </ul>
            <div class="detail-list-head-nav-bar"></div>
        </div>
        <div class="detail-list-body-wrapper wrapper" id="detail-list-body-wrapper">
            <div class="detail-list-body-list-scroller" id="detail-list-body-list-scroller">
                <!--song-->
                <div class="detail-list-list-song-wrapper wrapper" id="detail-list-list-song-wrapper">
                    <div class="detail-list-list-song-scroller scroller" id="detail-list-list-song-scroller">
                        <quick-play :toggle="quickPlayToggle" from="sheet" :sheetCode="sheetDetailList.sheetCode">
                            <single v-for="Data in sheetDetailList.list" :Data="Data" from="sheet" :sheetCode="sheetDetailList.sheetCode"></single>
                        </quick-play>
                        <div class="Scroll-Add-On"></div>
                    </div>
                </div>
                <!--detail-->
                <div class="detail-list-list-detail-wrapper wrapper">
                    详情开发中.....
                </div>
                <!--lyric-->
                <div class="detail-list-list-lyric-wrapper wrapper">
                    歌词本开发中......
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import publicJs from '../../publicJs/publicJs'
    import single from './listSongSingle'
    import quickPlay from './quickPlay'
    import {mapGetters,mapActions} from  'vuex'
    export default{
        name:'sheetDetailList',
        components:{
            single,
            quickPlay
        },
        data(){
            return{
                myScroll:null,
                myScrollB:null,
                currentPage:0,
            }
        },
        computed:{
            ...mapGetters({
                sheetDetailList:'sheetDetailList'
            }),
        },
        mounted(){
            let that=this;
            publicJs.initScroll({
                wrapper: 'detail-list-body-wrapper',
                scroller: 'detail-list-body-list-scroller',
                option: {scrollX: true, scrollY: false, momentum: false, snap: true,click:false},
                callbackFun: function (scroll) {
                    that.myScroll = scroll;
                    that.myScroll.on('scrollEnd', function () {
                        that.currentPage=that.myScroll.currentPage.pageX;
                        document.getElementsByClassName('detail-list-head-nav-bar')[0].style.transform='translateX('+((that.myScroll.currentPage.pageX*2+1)*125-50)/75+'rem)';
                    })
                }
            });
            this.findSheetWithCode({sheetCode:this.$route.params.sheetCode});
            if(this.sheetDetailList.list.length!=0){
                this.$nextTick(function () {
                    publicJs.initScroll({
                        wrapper: 'detail-list-list-song-wrapper',
                        scroller: 'detail-list-list-song-scroller',
                        option: {scrollX: false, scrollY: true,click:true},
                        callbackFun: function (scroll) {
                            that.myScrollB = scroll;
                        }
                    });
                })
            }
        },
        methods:{
            ...mapActions({
                findSheetWithCode:'findSheetWithCode'
            }),
            setCurrentPage(pageX){
                this.myScroll.goToPage(pageX,0,)
            }
        }
    }
</script>