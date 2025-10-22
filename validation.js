const Joi=require('joi')

const productSchema= Joi.object({
    name:Joi.string().required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required()
})

const orderSchema=Joi.object({
    userName:Joi.string().required(),
    products: Joi.array().items(
        Joi.object({
            productId: Joi.string().required(),
            qty:Joi.number().integer().min(1).required()
        })
    ).min(1).required()
})

module.exports={productSchema,orderSchema}