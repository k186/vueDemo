<template>
    <div class="personal-radio">
        <div class="radio-poster" @click="playPersonalRadio">
            <div class="poster-play icon">&#xe675;</div>
            <img  :src="personalRadio.poster!=''?personalRadio.poster:'../../../static/imgs/poster/default.jpg'" class="poster-img">
        </div>
        <div class="radio-text">
            <div class="text-title">{{personalRadio.title}}</div>
            <div class="text-described">{{personalRadio.described}}</div>
        </div>
    </div>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex'
    export default{
        name:'personalRadio',
        computed:mapGetters({
            personalRadio:'personalRadio'
        }),
        mounted(){
          this.$store.dispatch('initRadio',{callback:null});
        },
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