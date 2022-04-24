<template>
    <div class="container">
        <div class="title">
            <img src="logo128x128.png" alt="logo" width="32" style="margin-right: 12px" />
            Confluence Helper
        </div>
        <div class="tools">
            <button @click="router.push('md-to-html')" class="large-button">Md Loader</button>
        </div>
    </div>
    <div style="width: 100vw; text-align: center; height: 10vh algin-items; center">
        &copy; Allen Tao
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.container{
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
}
.large-button{
    padding: 24px 32px;
}
.title{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15vh;
    font-size: 32px
}
.tools{
    width: 100%;
    min-height: 10vh;
    display: flex;
    align-content: flex-start;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: center;
    box-sizing: border-box;
}
</style>
