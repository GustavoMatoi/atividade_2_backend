// src/pages/HomePage.tsx
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import HomePageViewModel from "./HomePageViewModel";

function HomePage() {
    const { handleAddProduct, handleAddToCart,setSearchTerm, handleSearchChange, searchTerm, filteredProducts, isLoading, error, handleRetry } = HomePageViewModel();
    console.log(error)
    if (isLoading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <h2 className="mb-3">🌐 Carregando produtos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">❌ Ops! Algo deu errado</h4>
          <p className="mb-3">{error}</p>
          <button className="btn btn-outline-danger" onClick={handleRetry}>
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        {/* Coluna do formulário */}
        <div className="col-lg-4 mb-4 mb-lg-0">
          <section>
            <ProductForm onAddProduct={handleAddProduct} />
            <div className="card mt-3 p-3 shadow-sm">
              <h6 className="text-center mb-2">Atualizar Catálogo</h6>
              <button
                className="btn btn-outline-primary btn-sm w-100"
                onClick={handleRetry}
                disabled={isLoading}
              >
                🔄 Recarregar da API
              </button>
            </div>
          </section>
        </div>

        {/* Coluna da busca e produtos */}
        <div className="col-lg-8">
          <section className="mb-4 p-3 card shadow-sm">
            <h3 className="mb-3 text-center">Buscar Produtos</h3>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Digite o nome do produto..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </section>

          <section className="my-4">
            <h2 className="text-center mb-4">
              Nossos Produtos ({filteredProducts.length})
            </h2>

            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <div className="col-12 text-center">
                  <div className="alert alert-info" role="alert">
                    <p className="lead mb-0">
                      {searchTerm
                        ? `Nenhum produto encontrado para "${searchTerm}".`
                        : "Nenhum produto disponível."}
                    </p>
                    {searchTerm && (
                      <button
                        className="btn btn-link p-0 mt-2"
                        onClick={() => setSearchTerm("")}
                      >
                        Limpar busca
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
