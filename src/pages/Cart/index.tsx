import React, { useMemo, useRef, useEffect } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { View, Animated } from 'react-native';

import {
  Container,
  ProductContainer,
  ProductList,
  Product,
  ProductImage,
  ProductTitleContainer,
  ProductTitle,
  ProductPriceContainer,
  ProductSinglePrice,
  TotalContainer,
  ProductPrice,
  ProductQuantity,
  ActionContainer,
  ActionButton,
  TotalProductsContainer,
  TotalProductsText,
  SubtotalValue,
  EmptyContainer,
  EmptyView,
  EmptyText,
} from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { increment, decrement, products } = useCart();

  function handleIncrement(id: Product): void {
    increment(id);
  }

  function handleDecrement(id: Product): void {
    decrement(id);
  }

  const cartTotal = useMemo(() => {
    const cartAmount = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return formatValue(cartAmount);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const cartAmount = products.reduce((total, product) => {
      return total + product.quantity;
    }, 0);

    return cartAmount;

    return 0;
  }, [products]);

  return (
    <Container>
      {products.length ? (
        <>
          <ProductContainer>
            <ProductList
              data={products}
              keyExtractor={item => item.id}
              ListFooterComponent={<View />}
              ListFooterComponentStyle={{
                height: 80,
              }}
              renderItem={({ item }: { item: Product }) => (
                <Product>
                  <ProductImage source={{ uri: item.image_url }} />
                  <ProductTitleContainer>
                    <ProductTitle>{item.title}</ProductTitle>
                    <ProductPriceContainer>
                      <ProductSinglePrice>
                        {formatValue(item.price)}
                      </ProductSinglePrice>

                      <TotalContainer>
                        <ProductQuantity>{`${item.quantity}x`}</ProductQuantity>

                        <ProductPrice>
                          {formatValue(item.price * item.quantity)}
                        </ProductPrice>
                      </TotalContainer>
                    </ProductPriceContainer>
                  </ProductTitleContainer>
                  <ActionContainer>
                    <ActionButton
                      testID={`increment-${item.id}`}
                      onPress={() => handleIncrement(item.id)}
                    >
                      <FeatherIcon name="plus" color="#E83F5B" size={16} />
                    </ActionButton>
                    <ActionButton
                      testID={`decrement-${item.id}`}
                      onPress={() => handleDecrement(item.id)}
                    >
                      <FeatherIcon name="minus" color="#E83F5B" size={16} />
                    </ActionButton>
                  </ActionContainer>
                </Product>
              )}
            />
          </ProductContainer>
          <TotalProductsContainer>
            <FeatherIcon name="shopping-cart" color="#fff" size={24} />
            <TotalProductsText>{`${totalItensInCart} itens`}</TotalProductsText>
            <SubtotalValue>{cartTotal}</SubtotalValue>
          </TotalProductsContainer>
        </>
      ) : (
        <EmptyContainer>
          <EmptyView>
            <Icon name="remove-shopping-cart" size={64} color="#E83F5B" />
            <EmptyText>Seu carrinho está vazio</EmptyText>
          </EmptyView>
        </EmptyContainer>
      )}
    </Container>
  );
};

export default Cart;
