const Product = require('../models/product.model');

const getProducts = async (req,res,next) => { // 제출 페이지, 관리 제품 페이지 표시
  try{
    const products = await Product.findAll();
    res.render('admin/products/all-products',{products:products});
  }catch(error){
    next(error);
    return;
  }
}

const getNewProduct = (req,res) => { 
  res.render('admin/products/new-products');
}

const createNewProduct = async (req,res,next) => {
  const product = new Product({
    ...req.body, 
    image: req.file.filename
  });

  try{
    await product.save();
  }catch(error){
    next(error);
    return;
  }
  // console.log(req.body);
  // console.log(req.file);

  res.redirect('/admin/products');
}

const getUpdateProduct = async (req,res,next) => {
  try{
    const product = await Product.findById(req.params.id);
    res.render('admin/products/update-products',{product:product});
  }catch(error){
    next(error);
  }
}

const updateProduct = async (req,res,next) => {
  const product = new Product({
    ...req.body,
    _id: req.params.id
  });

  if(req.file){ // request에 파일을 추가하지 않으면, Multer가 파일을 추출할 수 없으므로 거짓이됨
    // 오래된 이미지를 새 이미지로 교체
    product.replaceImage(req.file.filename); 
  }

  try{
    await product.save();
  }catch(error){
    next(error);
    return;
  }

  res.redirect('/admin/products');
}

const deleteProduct = async (req,res,next) => {
  let product
  try{
    product = await Product.findById(req.params.id);
    await product.remove();
  }catch(error){
    return next(error);
  }

  res.json({message:'Deleted product!'});
}

module.exports = {
  getProducts:getProducts,
  getNewProduct:getNewProduct,
  createNewProduct:createNewProduct,
  getUpdateProduct:getUpdateProduct,
  updateProduct:updateProduct,
  deleteProduct:deleteProduct
}