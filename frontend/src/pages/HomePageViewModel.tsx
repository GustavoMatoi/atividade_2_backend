import {useState, useEffect} from 'react';
import {ProductData} from '../components/ProductCard';
import {ProductFormData} from '../components/ProductForm';
import {fetchProducts, fetchProductById} from '../services/api';

export default function HomePageViewModel() {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [productId, setProductId] = useState<number | null>(null);
    const loadFromApi = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(`Falha ao carregar produtos: ${msg}`);
        } finally {
            setIsLoading(false);
        }
    };

    const loadProductById = async (id: number) => {
        try {
            setIsLoading(true);
            setError(null);
            const product = await fetchProductById(id);
            setProducts([product]);
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(`Falha ao carregar produto: ${msg}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(!productId) return
        const idNum = Number(productId);
        if (Number.isInteger(idNum) || idNum < 0) {
            setError("ID inválido, use um inteiro positivo");
            setIsLoading(false);
            return;
        }
        loadProductById(idNum);
    }, []);
    useEffect(() => {
        loadFromApi();
    }, []);

    // Handlers
    const handleAddProduct = (newProductData: ProductFormData) => {
        const newProductWithId: ProductData = {
            ...newProductData,
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        };
        setProducts(prevProducts => [...prevProducts, newProductWithId]);
    };

    const handleAddToCart = (productId: number) => {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            console.log(`🛒 Adicionado ao carrinho: ${productToAdd.title}`);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleRetry = () => {
        loadFromApi();
    };

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return {
        handleRetry,
        products,
        handleAddProduct,
        handleAddToCart,
        handleSearchChange,
        loadProductById,
        setProductId,
        productId,
        filteredProducts,
        isLoading,
        error,
        searchTerm,
        setSearchTerm
    }
    
}
