<template>
    <div class="quick-play-box">
        <transition name="toggleTop">
            <div v-show="toggle" class="quick-play-head">
                <div class="quick-play-btn left" @click.stop="playerSet({option:{sheetCode:sheetCode,from:from,playType:1}})">
                    <span class="icon ">&#xe675;</span>
                    <span>随机播放全部</span>
                </div>
                <div class="quick-play-btn right">
                    <span class="icon ">&#xe627;</span>
                    <span>下载</span>
                    <span class="icon ">&#xe637;</span>
                    <span>管理</span>
                </div>
            </div>
        </transition>
        <slot></slot>
    </div>
</template>
<script>
    import {mapActions} from  'vuex'
    export default{
        name:'quickPlay',
        props:{
            sheetCode:{
                required:true
            },
            toggle:{
                type:Boolean,
                required:true,
                default:true
            },
            from:{
                type:String,
                required:true
            }
        },
        methods:{
            ...mapActions({
                playerSet:'playerSet'
            })
        }
    }
</script>
