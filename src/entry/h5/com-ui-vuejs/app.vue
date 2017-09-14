<template>
    <div>
        <p>These elements below is in the vueElement</p>
        <child :alerttitle="parentTile" @parentOnSure="sureFun" @parentOnCancel="cancelFun"></child>
        <br />
        <input type="text" placeholder="'父组件的输入框，输入便可以改变父data里面的title属性'" v-model="parentTile">
    </div>
</template>

<style lang="less" scoped>

</style>

<script>
    import AlertComponent from '../../../common/h5-ui/alert-component-purely'
    import { adaptToVueAttr } from '../../../utils/dataattr-adapt-vue'
    const instanAlertTem = new AlertComponent({
        styleCustom: {
            acStyle: {
                backgroundColor: 'gray'
            }
        }
    }).createEle()
    const tem = adaptToVueAttr(instanAlertTem)
    const childComponent = {
        props: ['alerttitle'],
        template: tem,
        data () {
            return {
                // alerttitle: this.title,
                alertcontent: '这是子组件data属性content',
                commonAlertInput: ''
            }
        },
        methods: {
            inputFun () {
                this.alertcontent = this.commonAlertInput
            },
            sureFun () {
                console.log('这是vue子组件sure按钮抛出：' + this.commonAlertInput)
                this.$emit('parentOnSure', this.commonAlertInput)
            },
            cancelFun () {
                console.log('这是vue子组件cancel按钮抛出：' + this.commonAlertInput)
                this.$emit('parentOnCancel', this.commonAlertInput)
            }
        },
        updated () {
            console.log('child update')
        }
    }
    export default {
        data () {
            return {
                parentTile: '这是父组件data的title属性'
            }
        },
        methods: {
            sureFun (args) {
                console.log('这是vue父组件sure按钮抛出：' + args)
            },
            cancelFun (args) {
                console.log('这是vue父组件cancel按钮抛出：' + args)
            }
        },
        components: {
            'child': childComponent
        },
        updated () {
            console.log('parent update')
        }
    }
</script>