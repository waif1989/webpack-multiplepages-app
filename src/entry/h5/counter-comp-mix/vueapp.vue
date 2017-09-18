<template>
    <div>
        <p>The element below is vue component</p>
        <counter @addOnCall="addOnCall" @redOnCall="redOnCall" :parentVal="parentVal"></counter>
        <button class="getval" style="display: block" @click="getVal">获取vueapp实例里面的值</button>
        <input type="text" class="changeinput" v-model="parentNum" placeholder="从父组件改变子组件的值"><button class="changeval" @click="submit">提交</button>
    </div>
</template>

<style lang="less" scoped>

</style>

<script>
    import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'
   /* function addOnCall (val) {
        console.log('Vue parent add-on-call:', val)
    }
    function redOnCall (val) {
        console.log('Vue parent red-on-call:', val)
    }*/
    const counterComp = new CounterComp({
        initVal: 1
    })
    const counter = counterComp.useVue()
    export default {
        data () {
            return {
                // instrance: counter,
                parentVal: 0,
                parentNum: ''
            }
        },
        methods: {
            addOnCall (val) {
                console.log('Vue parent add-on-call:', val)
            },
            redOnCall (val) {
                console.log('Vue parent red-on-call:', val)
            },
            submit () {
                this.parentVal = this.parentNum
                // counterComp.changeVal(this.parentVal)
            },
            getVal () {
                console.log('Vue实例里面的值:', counterComp.getVal())
            }
        },
        components: {
            'counter': counter
        },
        created () {
            // console.log('instrance:', this.instrance)
        }
    }
</script>