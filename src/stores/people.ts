import { API } from '@/utils/api'
import { Payload, asyncRequest } from '@/utils/store'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Status } from '@/utils/store'

export const usePeopleStore = defineStore('people', () => {
    const people = ref(new Payload([]))

    function fetchPeople(page: number = 1) {
        const statusSetter = (value: Status) => people.value.status = value
        const action = async () => {
            people.value.data = await API.get(`https://swapi.dev/api/people/?page=${page}`)
        }
        return asyncRequest(action, statusSetter)
    }

    const rows = computed(() => {
        return people.value.data.results || []
    })

    return { people, fetchPeople, rows }
})
