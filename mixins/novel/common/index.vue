<script>
import {CDN_HOST} from '@/data/config.json'

export default {
  methods: {
    async getBackgroundImageUrl(id) {
      const {background} = await this.$axios.$get(`/api/v1/novel/common/picture/${id}`)
      const imageUrl = background.imageUrl
      return `url(${CDN_HOST}/novel/img/background/${imageUrl})`
    }
  }
}
</script>
