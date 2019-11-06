<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-cli
      </h1>
      <h2 class="subtitle">
        nuxt-cli-project111
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/ "
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Logo from '@/components/Logo.vue'
import Api from '@/api'

export default {
  components: {
    Logo
  },

  data() {
    return {
      title: 'title'
    }
  },

  head() {
    return {
      title: this.title,
      meta: [
        {name: 'description', content: 'this is news1'}
      ]
    }
  },

  mounted() {
    _.each([1,2,3,4,5,6,7,8,9,10], item => {
      console.log(item + 5999)
    })
    console.log(this.$date().format('YYYY-MM-DD'))
    this.$session.setLoginToken('888888888888')

    console.log('-----')
    console.log(this.$store.state)
    console.log('-----')

    this.$store.dispatch('changeInfo', '嘿嘿嘿')
    this.$store.dispatch('home/changeHome', '改变了一个home')

    Api.login({
      name: 'utone',
      pwd: '1234'
    }).then(res => {
      console.log(res)
    }).catch(err=>console.log(err))
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
