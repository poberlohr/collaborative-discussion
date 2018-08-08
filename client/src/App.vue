<template>
    <div id="app">
        <h1>{{ message }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'app',
        data () {
            return {
                message: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: Arial, sans-serif;
    }
</style>
