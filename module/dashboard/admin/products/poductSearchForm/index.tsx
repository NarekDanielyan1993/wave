import { Box, Button } from '@chakra-ui/react';
import Input from '@components/field/input';
import { useDebounce } from '@hooks/useDebounce';
import useDidUpdate from '@hooks/useDidUpdate';
import { useAppDispatch } from '@store/create-store';
import { getPaginatedProducts } from '@store/products/action';
import React, { useState } from 'react';

const ProductSearchForm = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');
    const { debounce } = useDebounce(search, 1000);

    useDidUpdate(() => {
        dispatch(
            getPaginatedProducts({
                filters: {
                    baseFilters: {
                        search: [
                            {
                                name: 'model',
                                value: debounce,
                                keyword: 'contains',
                                keywords: [
                                    {
                                        keyword: 'mode',
                                        value: 'insensitive',
                                    },
                                ],
                            },
                        ],
                    },
                },
            })
        );
    }, [debounce]);

    const formSubmitHandler = () => {
        dispatch(getPaginatedProducts({ limit: 10, page: 0 }));
        setSearch('');
    };

    return (
        <Box>
            <Input
                label="Search"
                onChange={(e: React.ChangeEvent<Element>) =>
                    setSearch(e.target.value)
                }
                value={search}
            />
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
