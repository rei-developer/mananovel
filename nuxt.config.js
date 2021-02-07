const webpack = require('webpack')
module.exports = {
  mode: 'universal',
  head: {
    title: '마나노벨',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no'},
      {name: 'theme-color', content: '#EDA7B2'},
      {name: 'robots', content: 'index, follow'},
      {hid: 'description', name: 'description', content: '마나노벨'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  loading: {color: '#EDA7B2'},
  css: [
    '@/assets/bootstrap',
    '@/assets/stylesheet'
  ],
  plugins: [
    {src: '@/plugins/event-bus'},
    {src: '@/plugins/toast'},
    {src: '@/plugins/vue-uuid'},
    {src: '@/plugins/vue-hcaptcha'},
    {src: '@/plugins/vue-cryptojs'},
    {src: '@/plugins/v-viewer.js', mode: 'client'}
  ],
  components: true,
  telemetry: false,
  buildModules: ['@nuxtjs/fontawesome'],
  modules: [
    'bootstrap-vue/nuxt',
    'nuxt-clipboard2',
    ['@nuxtjs/axios', {proxy: true}],
    ['@nuxtjs/moment', ['ko']]
  ],
  fontawesome: {
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      }
    ]
  },
  axios: {},
  build: {
    babel: {
      presets({isServer}) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            // require.resolve('@nuxt/babel-preset-app-edge'), // For nuxt-edge users
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: {version: 3}
            }
          ]
        ]
      }
    },
    vendor: ['vuex', 'external_library'],
    // vendor: ['vuex', 'socket.io-client'],
    filenames: {
      app: ({isDev}) => isDev ? '[name].js' : '[contenthash].js',
      chunk: ({isDev}) => isDev ? '[name].js' : '[contenthash].js',
      css: ({isDev}) => isDev ? '[name].css' : '[contenthash].css',
      img: ({isDev}) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({isDev}) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({isDev}) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    plugins: [
      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 512000 // 50kb
      })
    ],
    transpile: [
      '@hcaptcha/vue-hcaptcha',
      ({isServer}) => 'vue-typeahead-bootstrap'
    ]
  },
  proxy: {
    '/api': {
      target: 'http://localhost:10000',
      secure: false
    }
  }
}
