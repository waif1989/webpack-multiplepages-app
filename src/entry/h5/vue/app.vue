<template>
    <div>
        <div id="vueInside" class="d1">{{msg}}</div>
        <div v-html="header"></div>
        <div v-html="controlTemplate('#eee', '#333', '#d90000', number)"></div>
        <input type="text" v-model="number">
    </div>
</template>

<style lang="less" scoped>
    .d1 {
        color: gray;
    }
</style>

<script>
    import header from '../../../common/h5-ui/header.jsx'
    const h = header({
        reactRender: false,
        styleCustom: {
            d1Style: {
                fontSize: '14px',
                backgroundColor: 'red'
            }
        },
        componProps: {
            initProps: 6
        }
    })
    export default {
        data () {
            return {
                msg: 'This is Vue',
                number: 0,
                header: h
            }
        },
        methods: {
          controlTemplate (color1, color2, color3, number) {
              const h = header({
                  reactRender: false,
                  styleCustom: {
                      d1Style: {
                          backgroundColor: color1
                      },
                      text1Style: {
                          color: color2
                      },
                      text1Style: {
                          color: color3
                      }
                  },
                  componProps: {
                      initProps: number
                  }
              })
              return h
          }
        },
        components: {
        }
    }
</script>