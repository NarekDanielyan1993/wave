import { Button } from '@chakra-ui/react';
import IconButton from '@components/button/icon-button';
import ImageComponent from '@components/image';
import { useAppSelector } from '@store/create-store';
import { userSelector } from '@store/user/selectors';
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
    return (
        <StyledHomeCardContainer>
            <StyledHomeCardContent>
                <StyledHomeCardImage>
                    <ImageComponent layout="fill" src={product.url} />
                </StyledHomeCardImage>
                <StyledHomeCardTitle>{product.brand.name}</StyledHomeCardTitle>
                <StyledHomeCardText as="p">{product.model}</StyledHomeCardText>
                <StyledHomeCardText as="p">{product.price}</StyledHomeCardText>
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
