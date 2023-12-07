<script setup lang="ts">
import { IconConfigProvider } from '@twist-space/vue3-icons'
import {
  AiTagTwotone,
  AiAccountBookFilled,
  AiLeftCircleFilled
} from '@twist-space/vue3-icons/ai'
const onClick = () => {
  console.log('click')
}
</script>

<template>
  <div>
    <IconConfigProvider color="blue" :size="100">
      <AiTagTwotone />
    </IconConfigProvider>
    <AiTagTwotone />
    <AiTagTwotone :size="100" @click="onClick" title="razzh" />
    <AiAccountBookFilled :size="30" spin class="twist-aa" :style="{color: 'blue'}" />
    <AiLeftCircleFilled :size="100" dsad="99" />
  </div>
</template>
