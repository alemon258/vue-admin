<template>
    <div>
      <h2>22222222222222222</h2>
    </div>
</template>

<script>

export default {
    data() {
        return {
            tabName: '选项2'
        }
    },
    created() {
      this.$emit('showHeader', this.tabName)
    },
}
        
</script>