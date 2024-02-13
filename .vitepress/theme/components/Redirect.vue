<script setup>
import { useRouter, withBase }                     from 'vitepress'
import { defineProps, onBeforeUnmount, onMounted } from 'vue'


const { go } = useRouter()
const { delay, notice, to } = defineProps({
    delay: {
        type: [Number, Boolean],
        default: 3000,
        validator(raw) {
            return raw === false || raw >= 0
        }
    },
    notice: {
        type: [String, Boolean],
        default: 'warning'
    },
    to: {
        type: String,
        required: true
    }
})

const destination = withBase(to)
const willRedirect = delay !== false

const handleRedirect = () => go(destination)

onMounted(() => {
    if( !willRedirect ) {
        return
    }

    const timer = setTimeout(handleRedirect, delay)

    onBeforeUnmount(() => clearTimeout(timer))
})
</script>


<template>
    <div v-if="notice" class="custom-block" :class=[notice.toLowerCase()]>
        <h4 class="custom-block-title">⏩ REDIRECT</h4>

        <h3>It seems like the original page was recently moved.</h3>

        <small>
            <span v-if="willRedirect">You should be automatically redirected to it's new home.</span>
            <span v-else>
                It's new home can be found at <code><a @click="handleRedirect">{{ destination }}</a></code>.
            </span>
        </small>

        <p v-if="willRedirect">
            <br/>
            If you haven't been redirected in <code>{{ Math.ceil(delay / 1000) }}</code> seconds,
            please click <code><a @click="handleRedirect">{{ destination }}</a></code>.
        </p>
    </div>
</template>
