import ProductCardsSection from '@components/productCards';
import SliderComponent from '@components/slider';
import { PRODUCTS_API, SITE_API } from '@constant/api';
import { PRODUCT_CARDS_QUERY_DEFAULT_PARAMS } from '@constant/default';
import { FILE_UPLOAD_BASE_URL } from '@constant/file';
import { getProductsByCreatedDate } from '@store/products/productAction';
import { getSiteImages } from '@store/site/siteAction';
import { createServer } from '@test/server';
import { screen } from '@testing-library/react';
import { withCurrency } from '@utils/helper';
import { render, store } from '@utils/test';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { PromotionTypes } from 'types';
import { ISiteImageResponse } from 'types/client/store/site';

const renderComponent = (children: React.ReactNode) => {
    render(<MemoryRouterProvider>{children}</MemoryRouterProvider>);
};

describe('Slider component', () => {
    const sliderPromotions: PromotionTypes[] = [
        {
            lineOneText: 'fender',
            lineTwoText: 'custom shop',
            linkText: 'shop now',
            linkTo: '/shop',
        },
        {
            lineOneText: 'B-Stock',
            lineTwoText: 'awesome discounts',
            linkText: 'shop now',
            linkTo: '/shop',
        },
        {
            lineOneText: 'B-Stock',
            lineTwoText: 'awesome discounts',
            linkText: 'shop now',
            linkTo: '/shop',
        },
    ];

    const sliderImages: ISiteImageResponse[] = [
        {
            id: '65d86717d00a482074546e6c',
            name: 'featured_home.jpg',
            url: 'v1708680983/iilgfjxklzdrur59mnk5.jpg',
            publicId: 'iilgfjxklzdrur59mnk5',
            createdAt: '2024-02-23T09:36:23.273Z',
            updatedAt: '2024-02-23T09:36:23.273Z',
        },
        {
            id: '65d8671dd00a482074546e6d',
            name: 'featured_home_2.jpg',
            url: 'v1708680989/a9gq7wppmso7xva3diex.jpg',
            publicId: 'a9gq7wppmso7xva3diex',
            createdAt: '2024-02-23T09:36:29.438Z',
            updatedAt: '2024-02-23T09:36:29.438Z',
        },
    ];

    createServer([
        {
            method: 'get',
            path: SITE_API.GET_SITE_IMAGE,
            res: () => sliderImages,
        },
    ]);

    it('Renders promotions and images correctly', async () => {
        renderComponent(<SliderComponent />);
        store.dispatch(getSiteImages());
        expect(
            screen.getByText(sliderPromotions[0]?.lineOneText)
        ).toBeInTheDocument();
        expect(
            screen.getByText(sliderPromotions[0]?.lineTwoText)
        ).toBeInTheDocument();
        const redirectToShopLink = screen.queryAllByText(
            sliderPromotions[0].linkText
        );
        expect(redirectToShopLink).toHaveLength(3);
        expect(redirectToShopLink[0]).toHaveAttribute(
            'href',
            sliderPromotions[0]?.linkTo
        );
        const sliderImage1 = await screen.findByAltText(sliderImages[0].name);
        const sliderImageSrc1 = decodeURIComponent(
            sliderImage1.getAttribute('src')
        );
        expect(sliderImageSrc1).toContain(
            `${FILE_UPLOAD_BASE_URL}/${sliderImages[0]?.url}`
        );
    });
});

describe('Slider component', () => {
    const productImages = {
        products: [
            {
                id: '65d5d072cca9a24aa8206471',
                model: 'C-6 Deluxe',
                price: 987,
                brand: {
                    name: 'Schecter',
                },
            },
            {
                model: 'Electromatic Pristine LTD Jet /w Bigsby LRL',
                price: 789,
                brand: {
                    name: 'gretsch',
                },
            },
            {
                model: 'Les Paul Junior',
                price: 547,
                brand: {
                    name: 'Gibson',
                },
            },
        ],
        images: [
            {
                id: '65d5d133cca9a24aa8206473',
                name: 'Screenshot (3).png',
                url: 'v1708511539/zf2kazimixw7duhf5rmy.png',
                publicId: 'zf2kazimixw7duhf5rmy',
                productId: '65d5d072cca9a24aa8206471',
            },
            {
                id: '65d5d177cca9a24aa8206474',
                name: 'Screenshot (3).png',
                url: 'v1708511608/ganehobdvlq93qxgl1bl.png',
                publicId: 'ganehobdvlq93qxgl1bl',
                productId: '65d5d072cca9a24aa8206471',
            },
            {
                id: '65d5d327cca9a24aa8206478',
                name: 'Screenshot (10).png',
                url: 'v1708512039/hxlkwn6ap97kspisxenm.png',
                publicId: 'hxlkwn6ap97kspisxenm',
                productId: '65d5d199cca9a24aa8206475',
            },
        ],
    };

    createServer([
        {
            method: 'get',
            path: PRODUCTS_API.GET_PAGINATED_PRODUCTS,
            res: () => productImages,
        },
    ]);

    it('Renders latest product cards correctly.', async () => {
        const addToCartHandler = jest.fn();

        render(
            <ProductCardsSection
                addToCartHandler={addToCartHandler}
                title="latest guitars on the shop"
                which="latestProducts"
            />
        );

        store.dispatch(
            getProductsByCreatedDate({
                ...PRODUCT_CARDS_QUERY_DEFAULT_PARAMS,
            })
        );

        expect(
            await screen.findByText(productImages.products[0].model)
        ).toBeInTheDocument();
        expect(
            await screen.findByText(
                withCurrency(productImages.products[0].price)
            )
        ).toBeInTheDocument();

        expect(
            await screen.findByText(productImages.products[0].brand.name)
        ).toBeInTheDocument();

        const productImage = await screen.findByAltText(
            productImages.images[0].name
        );

        const productImageSrc = decodeURIComponent(
            productImage.getAttribute('src')
        );

        expect(productImageSrc).toContain(
            `${FILE_UPLOAD_BASE_URL}/${productImages.images[0].url}`
        );
    });
});
