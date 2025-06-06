export const baseURL = '/api'

const auth = '/auth'
const cars = '/cars'
const users = '/users'
const chat ='/chat'
const analytics='/analytics'
const addPhoto='cars/photo'

export const urls = {
    auth: {
        login: auth,
        refresh:`${auth}/refresh`,
        recovery: `${auth}/recovery`,
        socket: `${auth}/socket`

    },
    cars,
    users,
    chat,
    analytics,
    addPhoto
}