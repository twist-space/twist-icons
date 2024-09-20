<script setup lang="ts">
import './style.css'
import { AiThunderboltFilled, AiSmileOutlined } from '@twistify/vue3-icons/ai'
import { TiModeDark } from '@twistify/vue3-icons/ti'
import { BiBrightnessHigh } from '@twistify/vue3-icons/bi'
import { IconProvider } from '@twistify/vue3-icons';
import { mountedTwistIconsStyles } from '@twistify/vue3-icons';
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