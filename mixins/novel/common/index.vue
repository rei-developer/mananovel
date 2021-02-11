<script>
import {CDN_HOST} from '@/data/config.json'

export default {
  methods: {
    async getBackgroundImageUrl(id, url) {
      if (url)
        return `url(${url})`
      const {background} = await this.$axios.$get(`/api/v1/novel/common/picture/${id}`)
      const imageUrl = background.imageUrl
      return `url(${CDN_HOST}/novel/img/background/${imageUrl})`
    },
    getSize(type, width, height) {
      return type === 'px' || type === 'rem'
        ? `${width || height}${type} ${height || width}${type}`
        : type
    },
    getPosition(pos) {
      let result = 'unset'
      switch (pos) {
        case 1:
          result = 'left top'
          break
        case 2:
          result = 'center top'
          break
        case 3:
          result = 'right top'
          break
        case 4:
          result = 'left center'
          break
        case 5:
          result = 'center center'
          break
        case 6:
          result = 'right center'
          break
        case 7:
          result = 'left bottom'
          break
        case 8:
          result = 'center bottom'
          break
        case 9:
          result = 'right bottom'
          break
      }
      return result
    },
    getRotate(deg) {
      return `rotate(${deg}deg)`
    },
    getFilter(bgData) {
      let result = []
      if (bgData.blur)
        result.push(`blur(${bgData.blur}px)`)
      if (bgData.bright)
        result.push(`brightness(${bgData.bright})`)
      if (bgData.contrast)
        result.push(`contrast(${bgData.contrast}%)`)
      if (bgData.gray)
        result.push(`grayscale(${bgData.gray}%)`)
      if (bgData.hue)
        result.push(`hue-rotate(${bgData.hue}deg)`)
      if (bgData.invert)
        result.push(`invert(${bgData.invert}%)`)
      if (bgData.saturate)
        result.push(`saturate(${bgData.saturate}%)`)
      if (bgData.sepia)
        result.push(`sepia(${bgData.sepia}%)`)
      return result.join(' ')
    }
  }
}
</script>
