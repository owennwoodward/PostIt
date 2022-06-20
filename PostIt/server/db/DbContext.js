import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { AlbumSchema } from '../models/Album';
import { PictureSchema } from '../models/Picture';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Album = mongoose.model('Album', AlbumSchema)

  Picture = mongoose.model('Picture', PictureSchema)
}

export const dbContext = new DbContext()
