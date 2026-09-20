// src/pages/ProductDetailPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Importando a interface já existente!
import { FakeStoreProduct } from './HomePage';
import { useCart } from '../contexts/CartContext';


function ProductDetailPage() {
    // Hook do React Router para pegar parâmetros da URL
    const { productId } = useParams<{ productId: string }>();

    // Hook do contexto do carrinho
    const { addToCart } = useCart();

    // Estados para gerenciar os dados
    const [product, setProduct] = useState<FakeStoreProduct | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar um produto específico
    const fetchProductDetail = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const productData: FakeStoreProduct = await response.json();
            setProduct(productData);

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
            setError(`Falha ao carregar o produto: ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Carregar o produto quando o componente montar ou o ID mudar
    useEffect(() => {
        if (productId) {
            fetchProductDetail();
        }
    }, [productId]);

    // Handler para adicionar ao carrinho (versão simples, sem Context)
    const handleAddToCart = () => {
        if (product) {
            // Usar a função do contexto
            addToCart();

            // Feedback visual para o usuário
            console.log(`🛒 Adicionado ao carrinho: ${product.title}`);
            alert(`${product.title} foi adicionado ao carrinho!`);
        }
    };

    // Renderização condicional: Carregando
    if (isLoading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <h2>Carregando detalhes do produto...</h2>
            </div>
        );
    }

    // Renderização condicional: Erro
    if (error) {
        return (
            <div className="container text-center mt-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">❌ Erro</h4>
                    <p>{error}</p>
                    <Link to="/" className="btn btn-primary">
                        ← Voltar para a Home
                    </Link>
                </div>
            </div>
        );
    }

    // Renderização condicional: Produto não encontrado
    if (!product) {
        return (
            <div className="container text-center mt-5">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">⚠️ Produto não encontrado</h4>
                    <p>O produto que você está procurando não existe.</p>
                    <Link to="/" className="btn btn-primary">
                        ← Voltar para a Home
                    </Link>
                </div>
            </div>
        );
    }

    // Renderização principal: Detalhes do produto
    return (
        <div className="container mt-4">
            {/* Breadcrumb para navegação */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {product.title}
                    </li>
                </ol>
            </nav>

            <div className="row">
                {/* Coluna da imagem */}
                <div className="col-lg-6 mb-4">
                    <div className="card">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="card-img-top"
                            style={{
                                maxHeight: '500px',
                                objectFit: 'contain',
                                padding: '20px'
                            }}
                        />
                    </div>
                </div>

                {/* Coluna das informações */}
                <div className="col-lg-6">
                    <h1 className="h2 mb-3">{product.title}</h1>

                    {/* Categoria */}
                    <p className="text-muted mb-3">
                        <i className="bi bi-tag me-2"></i>
                        Categoria: <span className="badge bg-secondary">{product.category}</span>
                    </p>

                    {/* Avaliação */}
                    <div className="mb-3">
                        <div className="d-flex align-items-center gap-2">
                            <div className="text-warning">
                                {/* Estrelas */}
                                {[...Array(5)].map((_, index) => (
                                    <i
                                        key={index}
                                        className={`bi bi-star${index < Math.round(product.rating.rate) ? '-fill' : ''}`}
                                    ></i>
                                ))}
                            </div>
                            <span className="text-muted">
                                {product.rating.rate} ({product.rating.count} avaliações)
                            </span>
                        </div>
                    </div>

                    {/* Preço */}
                    <div className="mb-4">
                        <h3 className="text-success">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                        </h3>
                    </div>

                    {/* Descrição */}
                    <div className="mb-4">
                        <h5>Descrição</h5>
                        <p className="text-muted">{product.description}</p>
                    </div>

                    {/* Botões de ação */}
                    <div className="d-flex gap-3 mb-4">
                        <button
                            className="btn btn-success btn-lg flex-fill"
                            onClick={handleAddToCart}
                        >
                            <i className="bi bi-cart-plus me-2"></i>
                            Adicionar ao Carrinho
                        </button>
                        <button className="btn btn-outline-danger btn-lg">
                            <i className="bi bi-heart"></i>
                        </button>
                    </div>

                    {/* Link para voltar */}
                    <Link to="/" className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Voltar para a lista de produtos
                    </Link>
                </div>
            </div>

            {/* Seção adicional: Informações do produto */}
            <div className="row mt-5 mb-5">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">📋 Informações Adicionais</h5>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>ID do Produto:</strong> {product.id}</p>
                                    <p><strong>Categoria:</strong> {product.category}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Avaliação:</strong> {product.rating.rate}/5</p>
                                    <p><strong>Total de Avaliações:</strong> {product.rating.count}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetailPage;