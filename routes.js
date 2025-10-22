const express=require('express')
const router=express.Router()
const {Product, Order}=require('./models')
const {productSchema, orderSchema}=require('./validation')
const mongoose=require('mongoose')

// post products
router.post('/products',async(req,res)=>{
    const {error}=productSchema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const product=new Product(req.body)
    await product.save()
    res.send(product)
})

// get products
router.get('/products',async(req,res)=>{
    const products=await Product.find()
    res.send(products)
})

// post orders (transactions)
router.post('/orders',async(req,res)=>{
    const {error}=orderSchema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    const session=await mongoose.startSession()
    session.startTransaction()

    try{
        let totalAmount=0

        for(const item of req.body.products){
            const product= await Product.findById(item.productId).session(session)

            if(!product)
                throw new Error('product not found')
            if(product.stock<item.qty){
                throw new Error('Not enough stock')
            }

            product.stock-=item.qty
            totalAmount+=product.price* item.qty

            await product.save({session})
        }

        const order=new Order({
            userName: req.body.userName,
            products:req.body.products,
            totalAmount
        })

        await order.save({session})

        await session.commitTransaction()
        session.endSession()

        res.status(201).send(order)
    }catch(error){
        await session.abortTransaction()
        session.endSession()
        res.status(400).send({message:error.message})
    }
})

// get orders
router.get('/orders',async(req,res)=>{
    const orders=await Order.find().populate('products.productId')
    res.send(orders)
})

module.exports=router