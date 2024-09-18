<script setup lang="ts">
import './style.css'
import { AiThunderboltFilled, AiSmileOutlined } from '@twist-space/vue3-icons/ai'
import { TiModeDark } from '@twist-space/vue3-icons/ti'
import { BiBrightnessHigh } from '@twist-space/vue3-icons/bi'
import { IconProvider } from '@twist-space/vue3-icons';
import { mountedTwistIconsStyles } from '@twist-space/vue3-icons';
mountedTwistIconsStyles()
</script>

<template>
  <IconProvider :size="60">
    <AiThunderboltFilled color="#906efe" />
    <TiModeDark :size="30" />
    <AiSmileOutlined :rotate="180" />
    <BiBrightnessHigh spin />
  </IconProvider>
</template>