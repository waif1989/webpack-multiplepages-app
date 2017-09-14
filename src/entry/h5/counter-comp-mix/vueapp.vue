<template>
    <div>
        <p>The element below is vue component</p>
        <counter></counter>
    </div>
</template>

<style lang="less" scoped>

</style>

<script>
    import CounterComp from '../../../common/h5-ui/counter-comp-mix.jsx'
    const counterComp = new CounterComp()
    const counter = counterComp.useVue()
    export default {
        data () {
            return {

            }
        },
        methods: {

        },
        components: {
            'counter': counter
        }
    }
</script>