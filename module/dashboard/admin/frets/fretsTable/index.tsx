import { Box, Button } from '@chakra-ui/react';
import { Table, TableColumn } from '@components/table';
import { FRETS_TABLE_COLUMNS } from '@constant/table';
import { useAppDispatch, useAppSelector } from '@store/create-store';
import { deleteFrets } from '@store/frets/action';
import { paginatedFretsSelector } from '@store/frets/selectors';
import { getPaginatedProducts } from '@store/products/productAction';
import { useState } from 'react';
import { GetFretsResponse } from 'types/client/store/frets';
import AddEditFretsDialog from '../addEditFretsDialog';

const FretsTable = () => {
    const {
        frets,
        paginationData,
        isFretsLoading: isLoading,
    } = useAppSelector(paginatedFretsSelector);
    const dispatch = useAppDispatch();
    console.log(frets);

    const [dialogAddOpen, setDialogAddOpen] = useState<
        GetFretsResponse | boolean
    >(false);

    const [dialogEditOpen, setDialogEditOpen] = useState<
        GetFretsResponse | boolean
    >(false);

    const [selectedFrets, setSelectedFrets] = useState<string[]>([]);

    const columns: TableColumn<GetFretsResponse>[] = FRETS_TABLE_COLUMNS;
    const fretsUpdateHandler = () => {
        const fret = frets.find(fr => fr.id === selectedFrets[0]);
        if (fret) {
            setDialogEditOpen(fret);
        }
    };

    const removeFretsHandler = () => {
        if (selectedFrets[0]) {
            dispatch(deleteFrets({ id: selectedFrets[0] }));
        }
    };

    return (
        <>
            <Box display="flex" gap={2}>
                <Button
                    isDisabled={!selectedFrets.length}
                    onClick={fretsUpdateHandler}
                    variant="primary"
                >
                    edit
                </Button>
                <Button
                    isDisabled={!selectedFrets.length}
                    onClick={removeFretsHandler}
                    variant="primary"
                >
                    delete
                </Button>
            </Box>
            <Table<GetFretsResponse>
                cols={columns}
                data={frets}
                getPaginatedData={getPaginatedProducts}
                isLoading={isLoading}
                manualPagination={true}
                paginationData={paginationData}
                selectedRow={selectedFrets}
                setSelectedRow={setSelectedFrets}
            />
            <Button onClick={() => setDialogAddOpen(true)} variant="primary">
                Add frets
            </Button>
            {dialogAddOpen && (
                <AddEditFretsDialog
                    isOpen={!!dialogAddOpen}
                    onClose={() => {
                        setDialogAddOpen(false);
                    }}
                />
            )}
            {dialogEditOpen && (
                <AddEditFretsDialog
                    data={dialogEditOpen}
                    isOpen={!!dialogEditOpen}
                    onClose={() => {
                        setDialogEditOpen(false);
                    }}
                />
            )}
        </>
    );
};

export default FretsTable;
