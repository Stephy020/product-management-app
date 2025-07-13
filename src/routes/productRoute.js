import express from "express"

import prisma from "../db.js";

const router = express.Router();


//Add product with (name, price, quantity)
router.post("/", async (req, res)=>{
    try {
        const { name, description, price, quantity} = req.body
        const products = await prisma.product.create({
        data:{
            name ,
            description,
            price,
            quantity,
        }
    })
    res.status(201).json(products)
    console.log(products)
    } catch (error) {
        console.error("error creating a product",error)
        res.status(501).json({error:"error creating product"})
    }
})

// List all products
router.get("/", async (req, res)=>{
    try {
        const allProducts = await prisma.product.findMany();
        
        if (!allProducts){return res.status(404).json({message:'no product yet available '})}
        res.status(200).json(allProducts)

        console.log(allProducts)
    } catch (error) {
        res.status(501).json({error: "error fetching allProduts"})
    }
})

//Get one product
router.get("/:id", async (req, res)=>{
    try {
        const { id }= req.params
        console.log(id)
        const product = await prisma.product.findUnique({ where : {id,}})
    
        if (!product){return res.status(404).json({message: "product doesnt exist"})}
    
        res.status(200).json(product)
    } catch (error) {
        res.status(501).json({error: "error fetching Product with this id"})
    }
})

// Update product
router.put("/:id", async (req, res)=>{
    try {
        const { id }= req.params
        const newDetails = req.body
        console.log(newDetails)

        const updateProduct = await prisma.product.update({
        where: {id,},
        data: newDetails
    })
    console.log(updateProduct)
    res.status(201).json(updateProduct)
    } catch (error) {
        console.error("error updating product", error)
        res.status(500).json({error: "error updating product"})
    }
})


router.delete("/:id", async (req, res)=>{
    try {
        const { id } = req.params

    await prisma.product.delete({
        where: {id,}
    })

    res.status(200).json({message: "product was deleted successfully"})
    } catch (error) {
        console.error('product couldnt be deleted',error)
        res.status(500).json({error: 'could not delete product'})
    }
})

export default router 