import useForm from '@hooks/useForm';
import { useAppSelector } from '@store/create-store';
import { fretsSelector } from '@store/frets/selectors';
import {
    brandsSelector,
    paginatedProductsSelector,
} from '@store/products/selectors';
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

export const fretList = [
    {
        checked: false,
        name: 12,
    },
    {
        checked: false,
        name: 14,
    },
    {
        checked: false,
        name: 16,
    },
];

const ShopSideBar = ({
    filterProducts,
}: {
    filterProducts: (data: GetPaginatedProductsActionPayload) => void;
}) => {
    const { brands: data } = useAppSelector(brandsSelector);
    const { frets } = useAppSelector(fretsSelector);
    const {
        paginationData: { page },
    } = useAppSelector(paginatedProductsSelector);

    const { register, control, formState, handleSubmit } =
        useForm<FilterProductSchemaType>({
            defaultValues: {
                brands: data.map(brand => ({
                    name: brand.name,
                    checked: false,
                    id: brand.id,
                })),
                frets: frets.map(fret => ({
                    name: fret.frets,
                    checked: false,
                    id: fret.id,
                })),
                from: null,
                to: null,
            },
            validationSchema: filterProductSchema,
        });

    const { fields: brands, update } = useFieldArray({
        control,
        name: 'brands',
    });

    const { fields: fretsData, update: updateFrets } = useFieldArray({
        control,
        name: 'frets',
    });

    const onSubmit = (data: FilterProductSchemaType) => {
        console.log(brands);
        console.log(data);
        const formData: GetPaginatedProductsActionPayload = {
            page: 0,
            limit: 10,
            filters: {
                baseFilters: { search: [], range: [] },
            },
        };

        if (data.brands.some(brand => brand.checked)) {
            formData.filters.relation = {
                name: 'brand',
                baseFilters: { search: [] },
            };
            data.brands.forEach(brand => {
                if (brand.checked) {
                    formData?.filters?.relation?.baseFilters.search?.push({
                        keyword: 'contains',
                        name: 'name',
                        value: brand.name,
                    });
                }
            });
        }
        if (data.frets.some(fret => fret.checked)) {
            formData.filters.relation = {
                name: 'frets',
                baseFilters: { search: [], range: [] },
            };
            data.frets.forEach(fret => {
                if (fret.checked) {
                    formData?.filters?.relation.baseFilters.search?.push({
                        keyword: 'contains',
                        name: 'frets',
                        value: fret.name,
                    });
                }
            });
        }

        if (data.from || data.to) {
            formData?.filters?.baseFilters.range?.push({
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
                <Brands brands={brands} update={update} />
                <Frets frets={fretsData} update={updateFrets} />
                <PriceRange errors={formState.errors} register={register} />
            </form>
        </StyledSideBar>
    );
};

export default ShopSideBar;
