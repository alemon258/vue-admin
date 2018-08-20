<template>
    <div></div>
</template>


<script>

export default {
    data() {
        return {
            tabName: '导航3'
        }
    },
    created() {
      this.$emit('showHeader', this.tabName)
    },
}
       
</script>