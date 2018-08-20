<template>
    <div>44444444444444444</div>
</template>


<script>

export default {
    data() {
        return {
            tabName: '导航4'
        }
    },
    created() {
      this.$emit('showHeader', this.tabName)
    },
}
        
</script>