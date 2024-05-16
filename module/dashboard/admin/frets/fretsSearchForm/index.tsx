import { Box, Button } from '@chakra-ui/react';
import Input from '@components/field/input';
import { useDebounce } from '@hooks/useDebounce';
import { useAppDispatch } from '@store/create-store';
import { getFrets } from '@store/frets/action';
import { ChangeEvent, useState } from 'react';
import { SearchFilter } from 'types';

const FretsSearchForm = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState('');

    const formSubmitHandler = (val: string) => {
        const searchFilter: SearchFilter[] = [];
        searchFilter.push({
            name: 'frets',
            value: val,
            keyword: 'contains',
        });
        dispatch(
            getFrets({
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
        dispatch(getFrets({ limit: 10, page: 0 }));
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
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

export default FretsSearchForm;
