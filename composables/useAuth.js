import useFetchApi from "../composables/useFetchApi.js"
// import jwt_decode from "jwt-decode"
export default () => {
    const useAuthToken = () => useState('auth_token');
    const useAuthUser = () => useState('auth_user');
    const useAuthLoading = () => useState('auth_laoding',() => true);
    
    const setToken = (newToken) => {
        const authToken = useAuthToken()
        authToken.value = newToken
    }
    const setUser = (newToken) => {
        const authUser = useAuthUser()
        authUser.value = newToken 
    }
    const setIsAuthLoading = (newValue) => {
        const authLoading = useAuthLoading()
        authLoading.value = newValue
    }
    const login = ({username, password}) => {
        return new Promise(async(resolve, reject) => {
            try {
                const {data} = await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: {
                        username, password
                    }
                })
                setToken(data.access_token)
                setUser(data.user)
                resolve(true)
            } catch (error) {
                
            }
        })
    }

    const refreshToken = () => {
        return new Promise (async (resolve, reject) => {
            try {
                const data = await $fetch('/api/auth/refresh', {
                    method: "GET",
                    credentials: "include", 
                });
                setToken(data.access_token)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
    const getUser = () => {
        return new Promise (async (resolve, reject) => {
            try {
                const data = await useFetchApi('/api/auth/user');
                setUser(data.user)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    // const reRefreshAccessToken = () => {
    //     const authToken = useAuthToken()

    //     if (!authToken.value) {
    //         return
    //     }

    //     const jwt = jwt_decode(authToken.value)

    //     const newRefreshTime = jwt.exp - 60000

    //     setTimeout(async () => {
    //         await refreshToken()
    //         reRefreshAccessToken()
    //     }, newRefreshTime);
    // }
    const initAuth = () => {
        alert("jad")
        setIsAuthLoading(true)
        return new Promise(async(resolve, reject) => {
            try {
                await refreshToken()
                await getUser()

                //  reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                reject(error)
            }
            finally{
                setIsAuthLoading(false)

            }
        })
    }
 
    return {
        login,
        useAuthToken,
        useAuthUser,
        initAuth,
        useAuthLoading
    }
}