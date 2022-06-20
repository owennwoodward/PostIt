import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";
import { albumsService } from "../services/AlbumsService"
import { dbContext } from "../db/DbContext";
import { pictureService } from "../services/PictureService";




export class AlbumsController extends BaseController {
    constructor() {
        super('api/albums')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/pictures', this.getPictures)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createAlbum)
            .put('/:id', this.edit)
            .delete('/:id', this.remove)
    }

    async getAll(req, res, next) {
        try {
            const album = await albumsService.getAll()
            return res.send(album)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const album = await albumsService.getById(req.params.id)
            return res.send(album)
        } catch (error) {
            next(error)
        }
    }
    async getPictures(req, res, next) {
        try {
            const pictures = await pictureService.getPictures(req.params.id)
            return res.send(pictures)
        } catch (error) {
            next(error)
        }
    }


    async createAlbum(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const album = await albumsService.createAlbum(req.body)
            return res.send(album)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            await albumsService.remove(req.params.id, req.userInfo.id)
            return res.send({ message: 'Deleted' })
        } catch (error) {
            next(error)
        }
    }

    async edit(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const album = await albumsService.edit(req.body)
            return res.send(album)
        } catch (error) {
            next(error)
        }
    }
}