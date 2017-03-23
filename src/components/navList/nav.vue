<template>
  <div>
    <div v-for="nav in Nav">
      <nav-label :label="nav.label"></nav-label>
      <nav-box :data="nav.box"></nav-box>
    </div>
  </div>
</template>
<script>
  import navLabel from '../navLabel/label'
  import navBox from '../navbox/navbox'
  export default{
    name: 'navList',
    props: {
      Nav: {
        type: Array,
        required: true
      }
    },
    components: {
      navLabel,
      navBox
    }
  }
</script>
