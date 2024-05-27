<template>
    <div class="ui-table" :style="table_style">
        <div class="ui-table__headers">
            <div v-for="header in props.headers" :key="header.field" class="ui-table__header">
                {{ header.title }}
            </div>
        </div>
        <div v-for="row in rows" :key="row.id" class="ui-table__row">
            <div v-for="header in props.headers" :key="header.field" class="ui-table__cell">
                <div v-if="props.loading" class="ui-table__skeleton"/>
                <slot v-else :name="header.field" v-bind="row">{{ getCellContent(row, header) }}</slot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'

    type Header = {
        title: string;
        field: string;
        width?: string;
    };

    interface Row { id: number | string; [key: string]: unknown }

    interface TableProps {
        headers: Header[],
        rows: Row[],
        loading?: boolean,
    }

    const props = withDefaults(defineProps<TableProps>(), {
        loading: false
    })

    const table_style = computed(() => {
        return {
            '--grid-template-columns': props.headers
                .map((item) => item.width || 'minmax(min-content, auto)')
                .join(' ')
        }
    })

    const getCellContent = (row, header) => {
        return row[header.field]
    }
</script>

<style lang="scss">
    .ui-table {
        width: 100%;
        position: relative;
        display: grid;
        grid-template-columns: var(--grid-template-columns);
        grid-auto-rows: 80px;
        column-gap: 10px;
        overflow: auto;
        background-color: white;

        &__headers,
        &__row {
            grid-column: 1/ -1;
            display: grid;
            grid-template-columns: subgrid;
            border-bottom: 1px solid #00000033;
            cursor: default;
            align-items: center;
        }

        &__headers {
            position: sticky;
            top: 0;
            background-color: inherit;
        }

        &__cell, &__header, &__skeleton {
            padding: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        &__header {
            color: hsla(160, 100%, 37%, 1);
        }

        &__skeleton {
            background-color: gray;
            opacity: 0.5;
            border-radius: 6px;
            position: relative;
            &::after {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                transform: translateX(-100%);
                background-image: linear-gradient(
                        90deg,
                        rgba(#fff, 0) 0,
                        rgba(#fff, 0.2) 20%,
                        rgba(#fff, 0.5) 60%,
                        rgba(#fff, 0)
                );
                animation: shimmer 3s infinite;
                content: '';
            }
            @keyframes shimmer {
                100% {
                    transform: translateX(100%);
                }
            }
        }
    }
</style>
