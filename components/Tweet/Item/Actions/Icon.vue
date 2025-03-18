<template>
    <div @on-click="emits('onCommentClick')" class="flex items-center text-gray-400 cursor-pointer group">

        <div
            :class="`p-2 rounded-full group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`">

            <slot name="icon" :classes="`w-${props.size} h-${props.size}`" />

        </div>

        <span :class="`ml-1 group-hover:text-${props.color}-400`">
            <slot></slot>
        </span>

    </div>
</template>
<script setup>
import useTailwindConfig from "../../../../composables/useTailwindConfig.js"

const { defaultTransition } = useTailwindConfig()
const emits = defineEmits(['onCommentClick'])

const props = defineProps({
    color: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        default: 5
    }
})


</script>