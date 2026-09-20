import type {ProductData} from "../components/ProductCard"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

async function handle<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro desconhecido");
    }
    return response.json() as Promise<T>;
}

export async function fetchProducts(): Promise<ProductData[]> {
    const response = await fetch(`${BASE_URL}/api/products`);
    return handle<ProductData[]>(response);
}

export async function fetchProductById(id: number): Promise<ProductData> {
    const response = await fetch(`${BASE_URL}/api/products/${id}`);
    return handle<ProductData>(response);
}