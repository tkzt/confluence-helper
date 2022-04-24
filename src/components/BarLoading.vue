<template>
    <div class="container">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
    </div>
</template>
<style scoped>
.container{
    display: flex;
}
.bar1, .bar2, .bar3, .bar4, .bar5 {
    width: 5px;
    height: 37px;
    margin: 2px;
    background-color: rgb(143, 181, 214);
    animation: loading 1s infinite ease-in-out;
}

.bar2{
    animation-delay: 0.1s;
}
.bar3{
    animation-delay: 0.2s;
}
.bar4{
    animation-delay: 0.3s;
}
.bar5{
    animation-delay: 0.4s;
}

@keyframes loading {
    0%, 40%, 100%{
        -webkit-transform: scaleY(0.5);
    }
    20%{
        -webkit-transform: scaleY(1);
    }
}

</style>
