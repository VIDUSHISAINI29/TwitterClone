<script setup>
import useTailwindConfig from "../composables/useTailwindConfig.js"
import MainSection from "../components/MainSection.vue"
import TweetForm from "../components/Tweet/Form/Index.vue"
import TweetListFeed from "../components/Tweet/ListFeed.vue"
import useTweets from "../composables/useTweets.js"
const { twitterBorderColor } = useTailwindConfig()
const loading = ref(false)

const { getHomeTweets } = useTweets()

const homeTweets = ref([])
const { useAuthUser } = useAuth()

const user = useAuthUser()

onBeforeMount(async () => {
    loading.value = true
    try {
        const { tweets } = await getHomeTweets()
// console.log("tweets on page : ", tweets)
        homeTweets.value = tweets
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
})

function handleFormSuccess(tweet) {
    navigateTo({
        path: `/status/${tweet.id}`
    })
}

</script>

<template>
    <div>
        <MainSection title="Home" :loading="loading">

            <Head>
                <Title>Home / Twitter</Title>
           
            </Head>

             <div class="border-b" :class="twitterBorderColor">
              
                <TweetForm :user="user" @on-success="handleFormSuccess" />
            </div>
<!-- {{ homeTweets[1] }} -->
            <TweetListFeed :tweets="homeTweets" />

        </MainSection>
    </div>
</template>
