import { Button } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import ImageComponent from '@components/image';
import { useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import { userSelector, usersSelector } from '@store/user/selectors';
import { withCurrency } from '@utils/helper';
import { useRouter } from 'next/router';
import { type IProductCard } from 'types/product';
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
    return (
        <StyledHomeCardContainer>
            <StyledHomeCardContent>
                <StyledHomeCardImage>
                    <ImageComponent layout="fill" src={image?.url} />
                </StyledHomeCardImage>
                <StyledHomeCardTitle>{product.brand.name}</StyledHomeCardTitle>
                <StyledHomeCardText isTruncated as="p">
                    {product.model}
                </StyledHomeCardText>
                <StyledHomeCardText as="p">
                    {withCurrency(product.price)}
                </StyledHomeCardText>
            </StyledHomeCardContent>
            <StyledHomeCardActions>
                <Button
                    flexGrow={3}
                    onClick={() => router.push(`productDetail/${product.id}`)}
                    variant="tertiary"
                >
                    view product
                </Button>
                <IconButton
                    isDisabled={isCartLoading}
                    iconName="shop"
                    onClick={() =>
                        addToCartHandler({ userId: id, productId: product.id })
                    }
                    variant="iconPrimary"
                />
            </StyledHomeCardActions>
        </StyledHomeCardContainer>
    );
};

export default HomeCard;
