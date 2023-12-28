<script setup lang="ts">
import { IconProvider } from '@twist-space/vue3-icons'
import { TiCheckCircleFilled, TiCat } from '@twist-space/vue3-icons/ti'
import './style.css'
</script>

<template>
  <IconProvider :size="60">
    <TiCheckCircleFilled color="green" />
    <TiCat :size="30" />
  </IconProvider>
</template>