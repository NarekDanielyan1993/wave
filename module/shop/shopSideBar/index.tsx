import useForm from '@hooks/useForm';
import { useAppSelector } from '@store/create-store';
import { fretsSelector } from '@store/frets/selectors';
import { brandsSelector } from '@store/products/selectors';
import { useFieldArray } from 'react-hook-form';
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
    const { control, handleSubmit, register, formState } =
        useForm<FilterProductSchemaType>({
            defaultValues: {
                brands: brands.map(brand => ({
                    name: brand.name,
                    checked: false,
                })),
                frets: frets.map(fret => ({
                    name: fret.frets,
                    checked: false,
                })),
                from: null,
                to: null,
            },
            validationSchema: filterProductSchema,
        });

    const { fields: brandsData, update } = useFieldArray({
        control,
        name: 'brands',
    });

    const { fields: fretsData, update: updateFrets } = useFieldArray({
        control,
        name: 'frets',
    });

    const onSubmit = (data: FilterProductSchemaType) => {
        console.log(data);
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

    return (
        <StyledSideBar>
            <form onChange={handleSubmit(onSubmit)}>
                <Brands brands={brandsData} update={update} />
                <Frets frets={fretsData} update={updateFrets} />
                <PriceRange errors={formState.errors} register={register} />
            </form>
        </StyledSideBar>
    );
};

export default ShopSideBar;
