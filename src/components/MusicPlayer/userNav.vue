<template>
    <div class="user-nav-box">
        <div class="nav-box-head">
            <div class="box-head-btn">
                <div class="head-btn-btn head-btn-left"><i class="icon earphone">&#xe628;</i>59分钟</div>
                <div class="head-btn-img">
                    <img class="head-img" :src="MusicConfig.userHead+(userData.basicInfo.img!=''?userData.basicInfo.img:'default.jpg')" alt="头像">
                    <div class="box-head-name">&nbsp;&nbsp;{{userData.basicInfo.name}}&nbsp;&nbsp;</div>
                    <div class="box-head-vip">
                        <div class="vip-shinning"></div>
                        <img v-if="userData.basicInfo.vip.vip"   class="head-vip-icon"  :src="MusicConfig.iconVip+'vip'  +userData.basicInfo.vip.vip   +(MusicConfig.dpr>1?'@2x.png':'.png')" >
                        <img v-if="userData.basicInfo.vip.nvip"  class="head-vip-icon"  :src="MusicConfig.iconVip+'nvip' +userData.basicInfo.vip.nvip  +(MusicConfig.dpr>1?'@2x.png':'.png')" >
                        <img v-if="userData.basicInfo.vip.svip"  class="head-vip-icon"  :src="MusicConfig.iconVip+'svip' +userData.basicInfo.vip.svip  +(MusicConfig.dpr>1?'@2x.png':'.png')" >
                        <img v-if="userData.basicInfo.vip.nsvip" class="head-vip-icon"  :src="MusicConfig.iconVip+'nsvip'+userData.basicInfo.vip.nsvip +(MusicConfig.dpr>1?'@2x.png':'.png')" >
                        <img v-if="userData.basicInfo.vip.xvip"  class="head-vip-icon"  :src="MusicConfig.iconVip+'xvip' +userData.basicInfo.vip.xvip  +(MusicConfig.dpr>1?'@2x.png':'.png')" >
                        <img v-if="userData.basicInfo.vip.nxvip" class="head-vip-icon"  :src="MusicConfig.iconVip+'nxvip'+userData.basicInfo.vip.nxvip +(MusicConfig.dpr>1?'@2x.png':'.png')" >
                        <img v-if="userData.basicInfo.vip.sui"   class="head-vip-icon"  :src="MusicConfig.iconVip+'sui'  +userData.basicInfo.vip.sui   +(MusicConfig.dpr>1?'@2x.png':'.png')" >
                        <img v-if="userData.basicInfo.vip.nsui"  class="head-vip-icon"  :src="MusicConfig.iconVip+'nsui' +userData.basicInfo.vip.nsui  +(MusicConfig.dpr>1?'@2x.png':'.png')" >

                    </div>
                </div>
                <div class="head-btn-btn head-btn-right">续费</div>
            </div>
        </div>
        <div class="nav-box-enter">
            <div class="box-enter-row">
                <div class="box-enter-nav">
                    <div class="enter-nav-icon  icon markPoint">&#xe6d5;</div>
                    <div class="enter-nav-name">全部歌曲</div>
                    <div class="enter-nav-count">{{userData.basicInfo.totalSong.count}}</div>
                </div>
                <div class="box-enter-nav">
                    <div class="enter-nav-icon  icon">&#xe627;</div>
                    <div class="enter-nav-name">下载歌曲</div>
                    <div class="enter-nav-count"></div>
                </div>
                <div class="box-enter-nav">
                    <div class="enter-nav-icon  icon">&#xe6fe;</div>
                    <div class="enter-nav-name">最近播放</div>
                    <div class="enter-nav-count"></div>
                </div>
            </div>
            <div class="box-enter-row">
                <router-link tag="div" :to="'/Music/'+$route.params.userToken+'/detailList/favourite/'" class="box-enter-nav">
                    <div class="enter-nav-icon  icon">&#xe613;</div>
                    <div class="enter-nav-name">我喜欢</div>
                    <div class="enter-nav-count">{{userData.basicInfo.favourite.count}}</div>
                </router-link>
                <div class="box-enter-nav">
                    <div class="enter-nav-icon  icon">&#xe600;</div>
                    <div class="enter-nav-name">下载MV</div>
                    <div class="enter-nav-count"></div>
                </div>
                <div class="box-enter-nav">
                    <div class="enter-nav-icon  icon">&#xe64b;</div>
                    <div class="enter-nav-name">已购音乐</div>
                    <div class="enter-nav-count"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    export default{
        name: 'userNav',
        mounted(){
        },
        computed:{
            ...mapGetters({
                userData:'userData',
                MusicConfig:'MusicConfig'
            })
        }
    }
</script>