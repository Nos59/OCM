<script setup lang="ts">
    import Arrow from '@/assets/icon/arrow.svg'
    import { computed } from 'vue'

    interface PaginationProps {
        page?: number,
        perPage?: number,
        size?: number,
        total: number
    }

    const emit = defineEmits(['paginate'])
    const props = withDefaults(defineProps<PaginationProps>(), {
        page: 1,
        perPage: 10,
        size: 7
    })

    const totalPages = computed(() => {
        return Math.ceil(props.total / props.perPage)
    })

    const pages = computed(() => {
        if (props.size >= totalPages.value) {
            return range(1, totalPages.value)
        }

        const middlePages = Math.floor((props.size - 4) / 2)
        const leftLimit = 3 + middlePages
        const rightLimit = totalPages.value - 2 - middlePages

        if (props.page <= leftLimit) {
            return [...range(1, props.size - 2), '...', totalPages.value]
        }

        if (props.page >= rightLimit) {
            return [1, '...', ...range(rightLimit - middlePages, props.size - 2)]
        }

        return [1, '...', ...range(props.page - middlePages, props.size - 4), '...', totalPages.value]

    })

    const range = (start: number, count: number) => {
        return Array.from({ length: count }, (_, index) => start + index)
    }

    const paginate = (value: number) => {
        emit('paginate', value)
    }

    const next = () => {
        if (props.page < totalPages.value) {
            emit('paginate', props.page + 1)
        }
    }

    const prev = () => {
        if (props.page > 1) {
            emit('paginate', props.page - 1)
        }
    }
</script>

<template>
    <div class="ui-pagination">
        <div class="ui-pagination__item ui-pagination__item--select">
            <Arrow class="ui-pagination__arrow-left" @click="prev"/>
        </div>
        <template v-for="item in pages" :key="item">
            <div class="ui-pagination__item" v-if="item === '...'">{{ item }}</div>
            <div
                class="ui-pagination__item ui-pagination__item--select"
                v-else
                @click="paginate(Number(item))"
                :class="[{'ui-pagination__item--active': item === page}]">
                {{ item }}
            </div>
        </template>
        <div class="ui-pagination__item ui-pagination__item--select">
            <Arrow class="ui-pagination__arrow-right" @click="next"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ui-pagination {
        display: flex;
        gap: 5px;

        &__item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 6px;
            user-select: none;
            &--select {
                cursor: pointer;

                &:hover {
                    color: hsla(160, 100%, 37%, 1);
                }
            }

            &--active {
                background-color: #13263933;
            }
        }

        &__arrow-left {
            rotate: 90deg;
        }

        &__arrow-right {
            rotate: -90deg;
        }
    }
</style>
