const Cart = require('../models/Cart');
const catchAsync = require('../utils/catchAsync');

exports.addProduct = catchAsync(async (req, res) => {
  const {productId, quantity} = req.body;

  const userId = req.user._id.toString();

  try {
    let cart = await Cart.findOne({
      userId,
    });
    if (cart.status !== 'pending') {
      return res.status(412).send('El carrito ya esta pagado.');
    }
    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);

      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({
          productId,
          quantity,
        });
      }
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });

      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});

exports.deleteProduct = catchAsync(async (req, res) => {
  const productId = req.params.id;
  const userId = req.user._id.toString();
  try {
    let cart = await Cart.findOne({userId});
    if (!cart) {
      return res.status(412).send('No se encontro ningun carrito.');
    }
    if (cart.status !== 'pending') {
      return res.status(412).send('El carrito ya esta pagado.');
    }
    let itemIndex = cart.products.findIndex((p) => p.productId == productId);
    if (itemIndex == -1) {
      return res
        .status(404)
        .send({mensaje: 'No se encontró el producto', cart});
    }
    cart.products = cart.products.filter(
      (product) => product.productId !== productId,
    );
    cart = await cart.save();
    return res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});
exports.payCart = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id.toString();
    let cart = await Cart.findOne({userId});
    if (!cart) {
      return res.status(412).send('No se encontro ningun carrito.');
    }
    if (cart.status !== 'pending') {
      return res.status(412).send('El carrito ya esta pagado.');
    }
    cart.status = "PAID";
    cart = await cart.save();
    return res.status(200).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send('Something went wrong');
  }
});
