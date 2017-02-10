<template>
    <div class="personal-radio">
        <div class="radio-poster" @click="playPersonalRadio">
            <div class="poster-play icon">&#xe675;</div>
            <img src="../../../static/imgs/poster/defalut.png" class="poster-img">
        </div>
        <div class="radio-text">
            <div class="text-title">个性电台</div>
            <div class="text-described">来听听专门为你定制的音乐吧</div>
        </div>
    </div>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex'
    export default{
        name:'personalRadio',
        methods:{
            playPersonalRadio(){
                let option={
                    from:'radio'
                };
                this.$store.dispatch('playerSet',{option});
            }
        }
    }
</script>
<style>

</style>