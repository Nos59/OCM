<script setup lang="ts">
    import Chart from 'chart.js/auto'
    import { computed, onMounted, ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { usePeopleStore } from '@/stores/people'

    const myChart = ref<HTMLElement>()
    const store = usePeopleStore()
    const { rows } = storeToRefs(store)

    const labels = computed(() => {
        return rows.value.map(item => item.name)
    })

    const chartData = computed(() => {
        return rows.value.map(item => item.height)
    })

    onMounted(async () => {
        await store.fetchPeople()
        new Chart(myChart.value, {
            type: 'bar',
            data: {
                labels: labels.value,
                datasets: [{
                    label: 'Рост',
                    data: chartData.value,
                    borderWidth: 1
                }]
            }
        })
    })
</script>

<template>
    <canvas ref="myChart"/>
</template>

<style lang="scss" scoped>

</style>
