<script setup lang="ts">
import { useProvideIconContext } from '@twist-space/vue3-icons'
import { AiTagTwotone, AiAccountBookFilled, AiLeftCircleFilled, AiAlignCenterOutlined } from '@twist-space/vue3-icons/ai'
useProvideIconContext({
  color: 'red'
})
const onClick = () => {
  console.log('click')
}
</script>

<template>
  <div>
    <AiTagTwotone :size="100" @click="onClick" title="razzh"></AiTagTwotone>
    <AiAccountBookFilled :size="30" spin class="twist-aa" :style="{color: 'blue'}" />
    <AiLeftCircleFilled :size="100" dsad="99"></AiLeftCircleFilled>
    <AiAlignCenterOutlined></AiAlignCenterOutlined>
  </div>
</template>
