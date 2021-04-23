module.exports = {
  multipleMongooseToObject: function (mongooseArrays) {
    return mongooseArrays.map((mongooseArrays) => mongooseArrays.toObject());
  },
  mongooseToObject: function (mongoose) {
    return mongoose ? mongoose.toObject() : mongoose;
  },
};
