<script setup>
import UISpinner from "../../UI/Spinner.vue"
import TweetFormInput from "./Input.vue"
import useTweets from "../../../composables/useTweets.js"
const emits = defineEmits(['onSuccess'])
const loading = ref(false)
const { postTweet } = useTweets()

const props = defineProps({
    user: {
        type: Object,
        required: true
    },
    placeholder: {
        type: String,
        default: "What's happening ?"
    },
    replyTo: {
        type: Object,
        default: null
    },
    showReply: {
        type: Boolean,
        default: false
    }
})

async function handleFormSubmit(data) {
    loading.value = true
    try {
        const response = await postTweet({
            text: data.text,
            mediaFiles: data.mediaFiles,
            replyTo: props.replyTo?.id
        })

        emits('onSuccess', response.tweet)
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}
console.log("props. user = ", props.user)
{/* <TweetItem :tweet="props.replyTo" v-if="props.replyTo && props.showReply" hideActions /> */}

</script>
<template>
    <div>

        <div v-if="loading" class="flex items-center justify-center py-6">
            <UISpinner />
        </div>
        <div v-else>

            <TweetFormInput :placeholder="props.placeholder" :user="props.user" @onSubmit="handleFormSubmit" />
        </div>

    </div>
</template>
