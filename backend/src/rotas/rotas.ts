import { Router, Request, Response } from "express";
import { PrismaClient, Prisma } from '@prisma/client';
import { createProduct, deleteProduct, getProducts, getProductsById, updateProducts } from "../controller/productController";
import { z, ZodError } from 'zod'

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json({ status: "ok" })
})

router.get('/api/products', getProducts)
router.get('/api/products/:id', getProductsById)
router.post('/api/products', createProduct )
router.delete('/api/products/:id', deleteProduct)
router.put('/api/products/:id',  updateProducts)


export default router