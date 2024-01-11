import { Button, Text } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import ImageComponent from '@components/image';
import TruncatedText from '@components/trancatedText';
import { useAppSelector } from '@store/create-store';
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
    StyledShopCardTitle,
    StyledShopCardTitleBrandText,
} from './style';

const ShopCard = ({ product, addToCartHandler }: IProductCard) => {
    const router = useRouter();
    const {
        data: { id },
    } = useAppSelector(userSelector);
    return (
        <StyledShopCardContainer>
            <StyledShopCardImage>
                <ImageComponent layout="fill" src={product.url} />
            </StyledShopCardImage>
            <StyledShopCardContentWrapper>
                <StyledShopCardTitle>
                    <Text>
                        <StyledShopCardTitleBrandText as="span">
                            {product.brand.name}{' '}
                        </StyledShopCardTitleBrandText>
                        {product.model} {withCurrency(product.price)}
                    </Text>
                </StyledShopCardTitle>
                <StyledShopCardContent>
                    <TruncatedText text={product.description} />
                </StyledShopCardContent>
                <StyledShopCardActions>
                    <Button
                        color="brand.primary"
                        onClick={() =>
                            router.push(`productDetail/${product.id}`)
                        }
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
            </StyledShopCardContentWrapper>
        </StyledShopCardContainer>
    );
};

export default ShopCard;
