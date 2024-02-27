import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Thead,
    Tr,
    chakra,
} from '@chakra-ui/react';

export const StyledTableContainer = chakra(TableContainer, {
    baseStyle: {
        width: '100%',
        maxH: '60',
        overflowY: 'auto',
        border: '1px solid',
        borderColor: 'brand.primary.main',
    },
});

export const StyledTable = chakra(Table, {
    baseStyle: {
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'brand.background.main',
        borderCollapse: 'separate',
        borderSpacing: '0 1px',
        border: '1px solid',
        borderColor: 'brand.secondary.lighten',
    },
});

export const StyledTHead = chakra(Thead, {
    baseStyle: {
        width: '100%',
        // position: 'sticky',
        // top: 0,
        // zIndex: 2,
    },
});

export const StyledTbody = chakra(Tbody, {
    baseStyle: {},
});

export const StyledTheadTr = chakra(Tr, {
    baseStyle: {
        height: '10',
        backgroundColor: 'brand.primary.lighten',
    },
});

export const StyledTbodyTr = chakra(Tr, {
    baseStyle: {
        minHeight: '10',
        cursor: 'pointer',
        _even: {
            bgColor: 'brand.secondary.main',
            border: 'none',
        },
        _odd: {
            bgColor: 'brand.primary.main',
            border: 'none',
        },
    },
});

export const StyledTd = chakra(Td, {
    baseStyle: {
        maxW: '8',
        p: 2,
        overflow: 'hidden',
        color: 'brand.common.black',
        border: 'none',
    },
});

export const StyledTdText = chakra(Text, {
    baseStyle: {
        // p: '2',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        color: 'brand.common.black',
        border: 'none',
    },
});

export const StyledTh = chakra(StyledTd, {
    bgColor: 'brand.common.white',
});
