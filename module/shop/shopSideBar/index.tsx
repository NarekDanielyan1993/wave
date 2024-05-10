import { useDebounce } from '@hooks/useDebounce';
import useForm from '@hooks/useForm';
import { useAppSelector } from '@store/create-store';
import { fretsSelector } from '@store/frets/selectors';
import { brandsSelector } from '@store/products/selectors';
import { FormProvider, useFieldArray } from 'react-hook-form';
import type { GetPaginatedProductsActionPayload } from 'types';
import Brands from './brands';
import Frets from './frets';
import PriceRange from './priceRange';
import { StyledSideBar } from './style';
import {
    filterProductSchema,
    type FilterProductSchemaType,
} from './validationSchema';

const ShopSideBar = ({
    filterProducts,
}: {
    filterProducts: (data: GetPaginatedProductsActionPayload) => void;
}) => {
    const brands = useAppSelector(brandsSelector);
    const { frets } = useAppSelector(fretsSelector);

    const brandOptions = brands.map(brand => ({
        name: brand.name,
        checked: false,
    }));

    const fretOptions = frets.map(fret => ({
        name: fret.frets,
        checked: false,
    }));

    const methods = useForm<FilterProductSchemaType>({
        validationSchema: filterProductSchema,
        defaultValues: {
            brands: brandOptions,
            frets: fretOptions,
            from: null,
            to: null,
        },
    });

    const { control, handleSubmit } = methods;

    const { fields: brandsData, update } = useFieldArray({
        control,
        name: 'brands',
    });

    const { fields: fretsData, update: updateFrets } = useFieldArray({
        control,
        name: 'frets',
    });

    const onSubmit = (data: FilterProductSchemaType) => {
        const formData: GetPaginatedProductsActionPayload = {
            page: 0,
            limit: 10,
            filters: {
                baseFilters: { search: [], range: [] },
                relation: { search: [], range: [] },
            },
        };

        if (data.brands.some(brand => brand.checked)) {
            formData?.filters?.relation?.search?.push({
                keyword: 'in',
                name: 'name',
                value: data.brands.reduce((acc, brand) => {
                    if (brand.checked) {
                        acc.push(brand.name);
                    }
                    return acc;
                }, [] as string[]),
                relationName: 'brand',
            });
        }
        if (data.frets.some(fret => fret.checked)) {
            formData?.filters?.relation?.search?.push({
                keyword: 'in',
                name: 'frets',
                value: data.frets.reduce((acc, fret) => {
                    if (fret.checked) {
                        acc.push(fret.name);
                    }
                    return acc;
                }, [] as string[]),
                relationName: 'frets',
            });
        }

        if (data.from || data.to) {
            formData?.filters?.baseFilters?.range?.push({
                ...(data.from && { min: data.from }),
                ...(data.to && { max: data.to }),
                name: 'price',
            });
        }
        filterProducts(formData);
    };

    const debouncedSubmit = useDebounce(handleSubmit(onSubmit), 1000);

    return (
        <StyledSideBar>
            <FormProvider {...methods}>
                <form onChange={() => debouncedSubmit()}>
                    <Brands brands={brandsData} update={update} />
                    <Frets frets={fretsData} update={updateFrets} />
                    <PriceRange />
                </form>
            </FormProvider>
        </StyledSideBar>
    );
};

export default ShopSideBar;
