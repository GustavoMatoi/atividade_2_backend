import { z, ZodError } from 'zod'
import { Router, Request, Response } from "express";
import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

export const createProductSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres").max(100),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").max(200),
  price: z.coerce.number().positive('O preço deve ser maior que zero'),
  imageUrl: z.string().min(1, 'imageUrl é obrigatório'),
  isFeatured: z.coerce.boolean().optional().default(false)
})


const updateProductSchema = createProductSchema.partial()

export const updateProducts = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ error: "ID inválido, use um inteiro positivo" })
  try {
    const data = updateProductSchema.parse(req.body)
    const updated = await prisma.product.update({ where: { id }, data })
    return res.status(200).json(updated)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "payload inválido",
        issues: error.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message
        })),
      })
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return res.status(404).json({ error: "Produto não encontrado" })
    }
    return res.status(500).json({ error: "Erro interno ao atualizar produto" })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = createProductSchema.parse(req.body);
    const newProduct = await prisma.product.create({ data })
    return res.status(201).json(newProduct)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: 'Payload inválido',
        issues: error.issues.map((e) => ({
          path: e.path.join('.'),
          message: e.message
        }))
      });
    }
    return res.status(500).json({ error: "Erro ao criar produto" });
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Id inválido, utilize um inteiro" });
  }

  try {
    await prisma.product.delete({
      where: {
        id: id
      }
    });

    return res.status(204).send();
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    console.log("Erro de delete");
    return res.status(500).json({
      error: "Erro interno ao deletar o produto"
    });
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const produto_by_id = await prisma.product.findUnique({
      where: {
        id: id
      }
    })

    if (produto_by_id) {
      res.json(produto_by_id);
    } else {
      res.status(404).json({
        error: "Produto não encontrado."
      })
    }

  } catch (error) {
    return res.status(500).json({ error: "Id precisa ser um numero" })
  }
}

export const getProducts = async (req: Request, res: Response) => {
  try {
    const produtos = await prisma.product.findMany()
    res.json(produtos)
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar produtos" })
  }
}