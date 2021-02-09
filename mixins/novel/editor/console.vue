<script>
export default {
  methods: {
    throwConsole(type, message, beep = true) {
      if (beep) {
        let filename
        switch (type) {
          case 'info':
            filename = 'done'
            break
          case 'success':
            filename = ''
            break
          case 'warning':
            filename = ''
            break
          case 'error':
            filename = 'error'
            break
          case 'help':
            filename = ''
            break
        }
        if (filename) {
          const sound = new Audio(`/sound/${filename}.mp3`)
          sound.play()
        }
      }
      this.$eventBus.$emit('cs.console', type, message)
    }
  }
}
</script>
