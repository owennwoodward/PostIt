import { Auth0Provider } from "@bcwdev/auth0provider";
import { pictureService } from "../services/PictureService";
import BaseController from "../utils/BaseController";



export class PicturesController extends BaseController {
    constructor() {
        super('api/pictures')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .delete('/:id', this.remove)
    }
    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const picture = await pictureService.create(req.body)
            return res.send(picture)
        } catch (error) {
            next(error)
        }
    }
    remove(req, res, next) {
        throw new Error("Method not implemented.");
    }
}