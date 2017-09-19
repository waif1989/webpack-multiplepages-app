<template>
    <div>
        <p>The element below is vue component</p>
        <component :is="counter" ref="counter"></component>
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
            return {
                counterComp: null,
                counter: null,
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
                this.$refs.counter.changeVal(this.parentNum)
            },
            getVal () {
                console.log('Vue实例里面的值:', this.$refs.counter.getVal())
            }
        },
        created () {
            const counterComp = new CounterComp({
                initVal: 1,
                addOnCall: this.addOnCall,
                redOnCall: this.redOnCall
            })
            const counter = counterComp.useVue()
            this.counterComp = counterComp
            this.counter = counter
        },
        mounted () {
            this.counterComp.getInstances = this
        }
    }
</script>