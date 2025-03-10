import useFetchApi from "./useFetchApi.js"

export default () => {
    const postTweet = (formData) => {
        const form = new FormData()

        form.append('text', formData.text)
        return useFetchApi('/api/user/tweets',{
            method: 'POST',
            body: form
        })
    }
    const getHomeTweets = () => {
        return new Promise((resolve, reject) => {
            try {
                const response = useFetchApi('/api/user/tweets', {
                    method: 'GET',
                })
                resolve(response)
                // console.log('respors gethometweets =',response);
                
            } catch (error) {
                reject(error)
            }
        })
    }
    return {
        postTweet,
        getHomeTweets
    }
}