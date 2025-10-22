const mongoose= require('mongoose')

const ProductSchema= new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
})

const OrderSchema=new mongoose.Schema({
    userName: String,
    products:[
        {productId:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},qty:Number}
    ],
    totalAmount:Number,
    createdAt: {type:Date, default:Date.now}
})

const Product=mongoose.model('Product',ProductSchema)
const Order=mongoose.model('Order',OrderSchema)

module.exports={Product,Order}