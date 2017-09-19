<template>
    <div>
        <p>The element below is vue component</p>
        <component :is="counter" :parentVal="parentVal"></component>
        <button class="getval" style="display: block" @click="getVal">获取vueapp实例里面的值</button>
        <input type="text" class="changeinput" v-model="parentNum" placeholder="从父组件改变子组件的值"><button class="changeval" @click="submit">提交</button>
    </div>
</template>

<style lang="less" scoped>

</style>

<script>
    import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'
    export default {
        data () {
            const counterComp = new CounterComp({
                initVal: 1,
                addOnCall: this.addOnCall,
                redOnCall: this.redOnCall
            })
            const counter = counterComp.useVue()
            return {
                counterComp: counterComp,
                counter: counter,
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
            },
            getVal () {
                console.log('Vue实例里面的值:', this.counterComp.getVal())
            }
        },
        created () {

        },
        mounted () {
            this.counterComp.getInstances = this
        }
    }
</script>