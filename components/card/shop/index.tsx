import IconButton from '@components/button/icon-button';
import ImageComponent from '@components/image';
import TruncatedText from '@components/trancatedText';
import { PRODUCT_ROUTES } from '@constant/route';
import { useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import { userSelector, usersSelector } from '@store/user/selectors';
import { withCurrency } from '@utils/helper';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback } from 'react';
import { IProductCard } from 'types';
import {
    StyledShopCardActions,
    StyledShopCardContainer,
    StyledShopCardContent,
    StyledShopCardContentWrapper,
    StyledShopCardImage,
    StyledShopCardPriceText,
    StyledShopCardTitle,
    StyledShopCardTitleBrandText,
} from './style';

const ShopCard = ({ product, addToCartHandler }: IProductCard) => {
    const router = useRouter();
    const {
        data: { id },
    } = useAppSelector(userSelector);
    const { isCartLoading } = useAppSelector(usersSelector);
    const { images } = useAppSelector(productsSelector);
    const image = images.find(im => im.productId === product.id);
    const navigateToProductDetailHandler = useCallback(() => {
        router.push(`${PRODUCT_ROUTES.PRODUCT_DETAIL}/${product.id}`);
    }, []);

    const addToCart = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        addToCartHandler({ userId: id, productId: product.id });
    };
    return (
        <StyledShopCardContainer onClick={navigateToProductDetailHandler}>
            <StyledShopCardContentWrapper
                alignItems={{ base: 'center', md: 'flex-start' }}
                flexDir={{ base: 'column', md: 'row' }}
            >
                <StyledShopCardImage>
                    <ImageComponent
                        layout="fill"
                        objectFit="contain"
                        src={image?.url}
                    />
                </StyledShopCardImage>
                <StyledShopCardContent>
                    <StyledShopCardTitle>
                        <StyledShopCardTitleBrandText as="span">
                            {product.brand.name}{' '}
                        </StyledShopCardTitleBrandText>
                        {product.model}
                        <StyledShopCardPriceText>
                            {withCurrency(product.price)}
                        </StyledShopCardPriceText>
                    </StyledShopCardTitle>
                    <TruncatedText text={product.description} />
                </StyledShopCardContent>
            </StyledShopCardContentWrapper>
            <StyledShopCardActions>
                <IconButton
                    iconName="shop"
                    isDisabled={isCartLoading}
                    isLoading={isCartLoading}
                    onClick={addToCart}
                    size="md"
                    variant="primary"
                    w="full"
                />
            </StyledShopCardActions>
        </StyledShopCardContainer>
    );
};

export default ShopCard;
