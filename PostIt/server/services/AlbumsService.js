import { dbContext } from "../db/DbContext"
import { Forbidden } from "../utils/Errors"



class AlbumsService {

    async getAll() {
        const album = await dbContext.Album.find()
        return album
    }
    async getById(id) {
        const album = await dbContext.Album.findById(id)
        return album
    }


    async createAlbum(body) {
        const album = await dbContext.Album.create(body)
        return album
    }
    async remove(albumId, userId) {
        const album = await this.getById(albumId)
        if (album.creatorId.toString() != userId) {
            throw new Forbidden('Not your post')
        }
        await album.remove()
    }

    async edit(updated) {
        const original = await this.getById(updated.id)
        if (original.creatorId.toString() != updated.creatorId) {
            throw new Forbidden('This is not your Album')
        }

        original.name = updated.name || original.name
        original.coverImg = updated.coverImg || original.name
        await original.save()
        return original
    }

}


export const albumsService = new AlbumsService()