<template>
    <div>
        <p>These elements below is in the vueElement</p>
        <child :alerttitle="parentTile"></child>
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
                // alerttitle: '这是子组件data属性title',
                alertcontent: '这是子组件data属性content',
                commonAlertInput: '从父中设置静态props传入的placeholder'
            }
        },
        /*computed: {
            alertcontent () {
                return this.commonAlertInput
            }
        },*/
        watch: {
            commonAlertInput () {
                this.alertcontent = this.commonAlertInput
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

        },
        components: {
            'child': childComponent
        },
        updated () {
            console.log('parent update')
        }
    }
</script>