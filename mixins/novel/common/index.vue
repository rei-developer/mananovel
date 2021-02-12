<script>
import {CDN_HOST} from '@/data/config.json'

export default {
  methods: {
    async getImageUrl(type, id, url) {
      if (url)
        return `url(${url})`
      const key = `picture${id}`
      const item = localStorage.getItem(key)
      if (item)
        return item
      const {picture} = await this.$axios.$get(`/api/v1/novel/common/picture/${id}`)
      const imageUrl = `url(${CDN_HOST}/novel/img/${type}/${picture.imageUrl})`
      localStorage.setItem(key, imageUrl)
      return imageUrl
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
    getFilter(data) {
      let result = []
      if (data.blur)
        result.push(`blur(${data.blur}px)`)
      if (data.bright)
        result.push(`brightness(${data.bright})`)
      if (data.contrast)
        result.push(`contrast(${data.contrast}%)`)
      if (data.gray)
        result.push(`grayscale(${data.gray}%)`)
      if (data.hue)
        result.push(`hue-rotate(${data.hue}deg)`)
      if (data.invert)
        result.push(`invert(${data.invert}%)`)
      if (data.saturate)
        result.push(`saturate(${data.saturate}%)`)
      if (data.sepia)
        result.push(`sepia(${data.sepia}%)`)
      return result.join(' ')
    },
    getDebugColor(id) {
      const colorList = [
        ['#FF0000', '#FFF'],
        ['#FF5E00', '#FFF'],
        ['#FFBB00', '#333'],
        ['#FFE400', '#333'],
        ['#ABF200', '#333'],
        ['#1DDB16', '#333'],
        ['#00D8FF', '#333'],
        ['#0054FF', '#FFF'],
        ['#0100FF', '#FFF'],
        ['#5F00FF', '#FFF']
      ]
      return colorList[id % 10]
    }
  }
}
</script>
