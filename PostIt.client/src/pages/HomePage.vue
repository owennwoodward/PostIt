<template>
  <div class="container-fluid">
    <div class="row">


      <Album v-for="a in albums" :key="a.id" :album="a" />
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { albumsService } from '../services/AlbumsService'

export default {
  setup() {
    onMounted(async () => {
      try {
        await albumsService.getAlbums()
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.error(error)
      }
    })
    return {
      albums: computed(() => AppState.albums)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>