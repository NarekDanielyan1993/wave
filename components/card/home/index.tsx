import IconButton from '@components/button/icon-button';
import ImageComponent from '@components/image';
import { PRODUCT_ROUTES } from '@constant/route';
import { useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import { userSelector, usersSelector } from '@store/user/selectors';
import { withCurrency } from '@utils/helper';
import { useRouter } from 'next/router';
import { MouseEvent, useCallback } from 'react';
import { IProductCard } from 'types';
import {
    StyledHomeCardActions,
    StyledHomeCardContainer,
    StyledHomeCardContent,
    StyledHomeCardImage,
    StyledHomeCardText,
    StyledHomeCardTitle,
} from './style';

const HomeCard = ({ product, addToCartHandler }: IProductCard) => {
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
        <StyledHomeCardContainer onClick={navigateToProductDetailHandler}>
            <StyledHomeCardContent>
                <StyledHomeCardImage>
                    <ImageComponent
                        alt={image?.name}
                        layout="fill"
                        src={image?.url}
                    />
                </StyledHomeCardImage>
                <StyledHomeCardTitle>{product.brand.name}</StyledHomeCardTitle>
                <StyledHomeCardText as="p" isTruncated>
                    {product.model}
                </StyledHomeCardText>
                <StyledHomeCardText as="p">
                    {withCurrency(product.price)}
                </StyledHomeCardText>
            </StyledHomeCardContent>
            <StyledHomeCardActions>
                <IconButton
                    borderRadius="5px"
                    iconName="shop"
                    isDisabled={isCartLoading}
                    onClick={addToCart}
                    variant="primary"
                    w="full"
                />
            </StyledHomeCardActions>
        </StyledHomeCardContainer>
    );
};

export default HomeCard;
