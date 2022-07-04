<template>
    <!-- <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" > -->
    <!-- <label :for="id">{{ label }}</label> -->
    <el-input
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        :id="id"
        v-bind="$attrs"
    />
</template>

<script>
    export default {
        inheritAttrs: false,
        props:{
            label:{
                type: String,
                required: true,
            },
            id:{
                type: String,
                required: true,
            },
            modelValue:{
                type: String,
                required: true
            }
        },
        emits: ['update:modelValue']
    }
</script>

<style lang="scss" scoped>
.el-input {
  display: block;
  max-width: 75%;
  margin: 10px 0;
}
</style>