import { Box, Button } from '@chakra-ui/react';
import useForm from '@hooks/useForm';
import { useAppDispatch } from '@store/create-store';
import { getPaginatedProducts } from '@store/products/action';
import {
    productsSearchValidationSchema,
    type productSearchValidationTypes,
} from 'common/validation/product';

const ProductSearchForm = () => {
    const defaultValues = {
        search: '',
    };

    const dispatch = useAppDispatch();

    const { FormSearchField, watch, reset } =
        useForm<productSearchValidationTypes>({
            defaultValues,
            validationSchema: productsSearchValidationSchema,
        });

    const search = watch('search');

    const formSubmitHandler = (data?: productSearchValidationTypes) => {
        if (data) {
            dispatch(
                getPaginatedProducts({
                    filters: {
                        baseFilters: {
                            search: [
                                {
                                    name: 'model',
                                    value: data.target.value,
                                    keyword: 'contains',
                                },
                            ],
                        },
                    },
                })
            );
        } else {
            dispatch(getPaginatedProducts({ limit: 10, page: 0 }));
            reset();
        }
    };

    return (
        <Box>
            {FormSearchField({
                label: 'Search',
                name: 'search',
                fn: formSubmitHandler,
            })}
            <Button
                isDisabled={!search}
                onClick={() => formSubmitHandler()}
                variant="primary"
            >
                reset field
            </Button>
        </Box>
    );
};

export default ProductSearchForm;
