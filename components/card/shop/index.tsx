import { Button } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import ImageComponent from '@components/image';
import TruncatedText from '@components/trancatedText';
import { useAppSelector } from '@store/create-store';
import { productsSelector } from '@store/products/selectors';
import { userSelector } from '@store/user/selectors';
import { withCurrency } from '@utils/helper';
import { useRouter } from 'next/router';
import { type IProductCard } from 'types/product';
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
    const { images } = useAppSelector(productsSelector);
    const image = images.find(im => im.productId === product.id);
    return (
        <StyledShopCardContainer>
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
                <Button
                    color="brand.primary"
                    onClick={() => router.push(`productDetail/${product.id}`)}
                    variant="tertiary"
                >
                    view product
                </Button>
                <IconButton
                    iconName="shop"
                    onClick={() =>
                        addToCartHandler({
                            userId: id,
                            productId: product.id,
                        })
                    }
                    size="md"
                    variant="iconPrimary"
                />
            </StyledShopCardActions>
        </StyledShopCardContainer>
    );
};

export default ShopCard;
