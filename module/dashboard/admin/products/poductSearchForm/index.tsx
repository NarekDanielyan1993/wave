import { Box, Button } from '@chakra-ui/react';
import Input from '@components/field/input';
import { useDebounce } from '@hooks/useDebounce';
import { useAppDispatch } from '@store/create-store';
import { getPaginatedProducts } from '@store/products/productAction';
import React, { useState } from 'react';
import { SearchFilter } from 'types';

const ProductSearchForm = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');

    const formSubmitHandler = (val: string) => {
        const searchFilter: SearchFilter[] = [];
        searchFilter.push({
            name: 'model',
            value: val,
            keyword: 'contains',
            keywords: [
                {
                    keyword: 'mode',
                    value: 'insensitive',
                },
            ],
        });
        dispatch(
            getPaginatedProducts({
                filters: {
                    baseFilters: {
                        search: searchFilter,
                    },
                },
            })
        );
    };

    const debounceSubmit = useDebounce(formSubmitHandler, 1000);

    const formResetHandler = () => {
        dispatch(getPaginatedProducts({ limit: 10, page: 0 }));
        setSearch('');
    };

    const searchChangeHandler = (val: string) => {
        setSearch(val);
        debounceSubmit(val);
    };

    return (
        <Box>
            <Input
                label="Search"
                name="search"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    searchChangeHandler(e.target.value)
                }
                value={search}
            />
            <Button
                isDisabled={!search}
                onClick={() => formResetHandler()}
                variant="primary"
            >
                reset field
            </Button>
        </Box>
    );
};

export default ProductSearchForm;
