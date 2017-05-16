const mongoose = require('mongoose')

let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

let MovieSchema = new Schema({
	director:String,
	title:String,
	doctor: String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	pv: {
		type: Number,
		default: 0
	},
	category: {
		type: ObjectId,
		ref: 'Category'
	},
	// pv:{
	// 	type:Number,
	// 	default:0
	// },
	// category:{
	// 	type:ObjectId,
	// 	ref:'Category'
	// },
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})
MovieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})

MovieSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updatedAt')
      .exec(cb)
  },
  fundById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = MovieSchema
