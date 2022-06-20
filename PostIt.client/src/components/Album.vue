<template>
    <div class="col-12">
        <img class="img-fluid" :src="album.coverImg" alt="">
    </div>
    <div>
        {{ album.name }}
    </div>



</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState'

export default {
    props: { album: { type: Object, required: true } },
    setup(props) {
        return {
            albums: computed(() => AppState.albums)
        }
    }
}
</script>


<style lang="scss" scoped>
</style>