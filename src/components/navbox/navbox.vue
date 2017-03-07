<template>
  <div class="nav-box">
    <router-link :to="nav.router" class="nav-btn" v-for="nav,index in data" :key="index">
      <em @click="tap(nav.callback?nav.callback:'')">
        <i class="btn-icon" :class="nav.color" v-html="nav.icon"></i>
        <span class="btn-word">{{nav.name}}</span>
      </em>
    </router-link>
  </div>
</template>
<script>
  export default{
    name: 'navBox',
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    methods: {
      tap (callback) {
        if (callback.constructor === Function) {
          callback()
        }
      }
    }
  }
</script>
