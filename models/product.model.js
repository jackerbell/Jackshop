const mongodb = require('mongodb');
const db = require('../data/database');

class Product {
  constructor(productData){
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; // plus를 붙여 숫자로 변환
    this.description = productData.description;
    this.image = productData.image; // 이미지 파일 명
    this.updateImageData();
    if(productData._id){
      this.id = productData._id.toString();
    }
  }

  static findById = async (productId) => {
    let prodId;
    try{
      prodId = new mongodb.ObjectId(productId);
    }catch(error){
      error.code = 404;
      throw error
    }
    const product = await db.getDb().collection('products').findOne({_id:prodId});
    if(!product){ // 아이디가 없는 경우
      const error = new Error('Could not find product with provided id.');
      error.code = 404;
      throw error;
    }
    return new Product(product);
  } 

  static findAll = async () => { // 인스턴스화할 필요가 없으므로 static!
    const products = await db.getDb().collection('products').find().toArray();
    return products.map((productDocument)=>{
      return new Product(productDocument); // Product에 있는 모든 객체를 표현 가능.
    });
  }

  updateImageData = () => {
    this.imagePath = `product-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async save() { // 데이터베이스와 통신  
    const productData = {
      title : this.title,
      summary : this.summary,
      price : this.price,
      description : this.description,
      image : this.image,
    };

    if(this.id){
      const prodId = new mongodb.ObjectId(this.id);

      if(!this.image){
        delete productData.image; // 이미지 데이터가 없는 경우 키,값을 제거함으로써 잘못된 값이 image에 들어가는 것 방지!!
      }

      await db.getDb().collection('products').updateOne(
        {_id:prodId},
        {
          $set: productData
        }
      )      
    } else {
      await db.getDb().collection('products').insertOne(productData);
    }
  }

  replaceImage = async (newImage) => {
    this.image = newImage;
    this.updateImageData();
  }

  remove = () => {
    const prodId = new mongodb.ObjectId(this.id);
    return db.getDb().collection('products').deleteOne({_id: prodId});
  }
 
}

module.exports = Product;