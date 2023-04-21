const stripe = require('stripe')('sk_test_51Myrw1CRXS1yysnoXTTzxpqivTUaSASszdAhrXUOtXHq8iH8mC9Gn8ktTRcVNgc6oHzrHGw82KmcllA6nOTZsa45008M6yPUMD'); // 결제 관련 이슈(시크릿 코드를 사용한 실제 요금 청구)로 인해 문자열 처리, 
const Order = require('../models/order.model');                         //사용하려는 경우에는 스프라이트 가입 후 발행한 시크릿 키를 넣어 사용가능
const User = require('../models/user.model');

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {
      orders: orders
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items: cart.items.map(function(item){
      return {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price_data: {
          currency: 'usd',
          product_data:{
            name: item.product.title
          },
          unit_amount: +item.product.price.toFixed(2) * 100 // stripe 계산식으로 인해 소수점 두 자리 이상으로 변환, 가격을 센트로 변환
        },
        quantity: item.quantity,
      } 
    }),
    mode: 'payment',
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });

  res.redirect(303, session.url);
  // res.redirect('/orders');
}

function getSuccess(req,res) {
  res.render('customer/orders/success');
}

function getFailure(req,res) {
  res.render('customer/orders/failure');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure
};
