<template>
  <div class="quickInts">
    <p v-for="(item,index) in data"
       :key="item.id"
       :class="index===da.length-1&&da.length%2==1?'upside_list_class':''"
       :style="[{borderRadius:'5px', background: item.color}]">
      <span class="list">
        {{item.templateName}}
      </span>
    </p>
  </div>
</template>
<script>
export default {
  props: {
    temp: {
      type: Array
    }
  },
  data () {
    return {
      da: []
    }
  },
  computed: {
    data() {
      if (this.temp && this.temp.length) {
        let arr = Object.assign([], this.temp)
        return arr
      }
    }
  }
}
</script>

<style lang="stylus">
@import './common.styl'
</style>
