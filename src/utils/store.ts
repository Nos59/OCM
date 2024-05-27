type CallbackFunction = (...args: any[]) => void
const defaultCallback: CallbackFunction = () => {}

export type Status = 'failed' | 'success' | 'loading' | null

export class Payload<T> {
    status: Status
    data: T

    constructor(value: T) {
        this.status = null
        this.data = value
    }

    get loading() {
        return this.status === 'loading'
    }

    get success() {
        return this.status === 'success'
    }

    get failed() {
        return this.status === 'failed'
    }
}


export async function asyncRequest(asyncAction, statusSetter = defaultCallback) {
    statusSetter('loading')
    try {
        const result = await asyncAction()
        setTimeout(() => statusSetter('success'), 1000)

        return result
    } catch (error) {
        console.log(error)
        statusSetter('failed')
    }
}
