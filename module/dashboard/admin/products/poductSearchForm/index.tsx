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

    const { FormSearchField } = useForm<productSearchValidationTypes>({
        defaultValues,
        validationSchema: productsSearchValidationSchema,
    });

    const formSubmitHandler = data => {
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
    };

    return (
        <Box>
            {FormSearchField({
                name: 'search',
                fn: formSubmitHandler,
            })}
            <Button variant="primary">reset field</Button>
        </Box>
    );
};

export default ProductSearchForm;
