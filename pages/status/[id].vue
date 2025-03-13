<script setup>
import MainSection from "../../components/MainSection.vue"
import useTweets from "../../composables/useTweets.js"
import useAuth from "../../composables/useAuth.js"
import TweetDetails from "../../components/Tweet/Details.vue"
const loading = ref(false)
const tweet = ref(null)
const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const user = useAuthUser()
console.log("entere dynamix page");


watch(() => useRoute().fullPath, () => getTweet())

function getTweetIdFromRoute() {
    return useRoute().params.id
}

async function getTweet() {
    loading.value = true
    try {
        const response = await getTweetById(getTweetIdFromRoute())
console.log("r = ", response);

        tweet.value = response.tweet
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false
    }
}

onBeforeMount(() => {
    getTweet()
})

</script>

<template>
    <div>
        <MainSection title="Tweet" :loading="loading">

            <Head>
                <Title></Title>
            </Head>


            <TweetDetails :user="user" :tweet="tweet" />

        </MainSection>
    </div>
</template>
