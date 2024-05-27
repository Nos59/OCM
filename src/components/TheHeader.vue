<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="header">
        <RouterLink to="/">Персонажи</RouterLink>
        <RouterLink to="/about">Рост</RouterLink>
    </nav>
</template>

<style lang="scss" scoped>
    .header {
        display: flex;
        gap: 10px;
        align-items: center;
    }
</style>
