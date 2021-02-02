export default{
    props:{
        to:{
            type:String,
            required:true
        },
        tag:{
            type:String
        }
    },

    render(){
        let tag = this.tag || 'a';
        let handler = ()=>{this.$router.push(this.to);}
        return <tag onClick={handler}>{this.$slots.default}</tag>
    }
}