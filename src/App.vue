<template>
    <div class="dateBox">
        <div class="formGroup PickerGroup">
            <input type="text" class="form-control"/>
            <k-picker ></k-picker>
        </div>
    </div>

</template>

<script>
import kPicker from './components/datepicker/Picker'
export default {
  name: 'app',
  data: function () {
    return {
      date: '111'
    }
  },
  components: {kPicker}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import "./components/App.css";
</style>
