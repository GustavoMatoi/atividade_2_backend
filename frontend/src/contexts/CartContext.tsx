// src/contexts/CartContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// 1. Definir a interface - o "contrato" do nosso contexto
interface CartContextType {
    itemsCount: number;           // Quantidade de itens no carrinho
    addToCart: () => void;       // Função para adicionar item
    clearCart: () => void;       // Função para limpar carrinho (bônus!)
}

// 2. Criar o contexto - undefined por padrão
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Criar o Provider - componente que "fornece" o contexto
interface CartProviderProps {
    children: ReactNode;  // Os componentes filhos que terão acesso ao contexto
}

export function CartProvider({ children }: CartProviderProps) {

    // Estado local do carrinho
    const [itemsCount, setItemsCount] = useState<number>(0);

    // Função para adicionar item ao carrinho
    const addToCart = () => {
        setItemsCount(prevCount => prevCount + 1);
        console.log('🛒 Item adicionado ao carrinho!');
    };

    // Função para limpar o carrinho (bônus!)
    const clearCart = () => {
        setItemsCount(0);
        console.log('🗑️ Carrinho limpo!');
    };

    // Valor que será compartilhado
    const contextValue: CartContextType = {
        itemsCount,
        addToCart,
        clearCart
    };

    // Retornar o Provider com o valor
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

// 4. Hook customizado para usar o contexto (boa prática!)
export function useCart() {
    const context = useContext(CartContext);

    // Verificação de segurança
    if (context === undefined) {
        throw new Error('useCart deve ser usado dentro de um CartProvider');
    }

    return context;
}

export { CartContext };