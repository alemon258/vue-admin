<template>
    <div></div>
</template>


<script>

export default {
    data() {
        return {
            tabName: '选项4-1'
        }
    },
    created() {
      this.$emit('showHeader', this.tabName)
    },
}
     
        
</script>