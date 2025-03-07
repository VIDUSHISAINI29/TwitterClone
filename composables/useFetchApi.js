// import useAuth from "../composables/useAuth.js"
// const {useAuthToken} = useAuth() 
export default (url, options = {}) => {
    return $fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${useAuthToken().value}`
        }
    })
}