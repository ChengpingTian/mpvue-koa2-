<template>
    <div class="star-con">
        <div class="sllow">☆☆☆☆☆ </div>
         <div class="show" :style="style">★★★★★</div>

    </div>
</template>
<script>
export default {
    props:{
      value:{type:[Number,String],default:'0'}
    },
    computed:{
       style(){
           return `width:${this.value/2}em`
       }

    }
}
</script>
<style>
.star-con{
    position: relative;
    margin-left: 3px;
}
.show{
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
}
</style>

