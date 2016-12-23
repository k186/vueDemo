<template>
    <div class="nav-box">
        <router-link :to="nav.router" class="nav-btn" v-for="nav in data">
            <i class="btn-icon" :class="nav.color"  v-html="nav.icon"></i>
          <span class="btn-word">{{nav.name}}</span>
        </router-link>
    </div>
</template>
<script>
    export default{
        name:'navBox',
        props:{
            data:{
                type:Array,
                required:true
            }
        },
    }
</script>