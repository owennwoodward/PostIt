import { dbContext } from "../db/DbContext"



class PictureService {
    async create(body) {
        const picture = await dbContext.Picture.create(body)
        return picture
    }
    async getPictures(id) {
        const picture = await dbContext.Picture.findById(id)
        return picture
    }

}



export const pictureService = new PictureService()