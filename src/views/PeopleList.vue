<script setup lang="ts">
    import UiPagination from '@/components/ui/UiPagination.vue'
    import UiTable from '@/components/ui/UiTable.vue'
    import { onMounted, ref } from 'vue'
    import { storeToRefs } from 'pinia'
    import { usePeopleStore } from '@/stores/people'

    const store = usePeopleStore()
    const { people, rows } = storeToRefs(store)

    onMounted(() => {
        store.fetchPeople()
    })

    const headers = ref([
        { title: 'Имя', field: 'name', width: '1fr' },
        { title: 'Рост', field: 'height', width: '1fr' },
        { title: 'Дата рождения', field: 'birth_year', width: '1fr' },
        { title: 'Пол', field: 'gender', width: '1fr' }
    ])

    const page = ref<number>(1)
    const paginate = (value: number) => {
        page.value = value
        store.fetchPeople(value)
    }
</script>

<template>
    <div class="people-list">
        <UiTable :headers="headers" :rows="rows" :loading="people.loading"/>
        <UiPagination
            v-if="!!rows.length"
            :page="page"
            :total="people.data.count"
            @paginate="paginate"
        />
    </div>
</template>

<style lang="scss" scoped>
    .people-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }
</style>
