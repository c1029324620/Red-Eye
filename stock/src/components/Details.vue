<template>
    <RequestHttp :ticker="id"></RequestHttp>
       <div class="mastfoot">
            <p>Power by <a href="https://api.tiingo.com/" target="_blank">Tiingo</a>. Developed by Kevin Cao</p>
        </div>
</template>

<script>
import RequestHttp from './RequestHttp.vue'

export default {
    components: {
        RequestHttp
    },
    data() {
        return {
            id:this.$route.params.id,
        }
    },
    methods:{
    }
}
</script>
<style>
</style>