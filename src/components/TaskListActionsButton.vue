<template>
    <el-button  size="small"  round v-bind="$attrs">
        <strong>
            <slot name="text"></slot>
        </strong>
        <slot></slot>
    </el-button>
</template>

<script>
    export default {
        inheritAttrs: false
        
    }
</script>

<style lang="scss" scoped>

</style>