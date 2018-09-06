<template>
    <div>
        图书id：{{bookid}}
    </div>
</template>
<script>
import { get } from "@/util";
export default {
    data () {
        return {
            bookid:""      
        }
    },
    methods: {
         async getsetail(){
             const info = await get('/weapp/booksdetails',{id:this.bookid})
         }
    },
    mounted () {
        this.bookid=this.$root.$mp.query.id
        this.getsetail()
    }
}
</script>
<style>

</style>

