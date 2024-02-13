<script setup>
import { useData } from 'vitepress'


const { page } = useData()
</script>


<template>
    <div class="lead">
        <p v-for="(content, key) in page.frontmatter.lead" :key="key">
            {{ content }}
        </p>

        <hr />
    </div>
</template>
