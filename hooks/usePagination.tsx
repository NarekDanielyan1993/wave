import { Button } from '@chakra-ui/react';

const usePagination = ({
    currentPage,
    getNextPage,
    getPrevPage,
    hasPrevPage,
    hasNextPage,
    pageCount,
    setCurrentPage,
}: {
    currentPage: number;
    getNextPage: () => void;
    getPrevPage: () => void;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    pageCount: number;
    setCurrentPage: (index: number) => void;
}) => {
    console.log(currentPage);

    const buttonCount = 3;
    const firstPage = 1;
    let displayedPages: number[] = [];

    if (pageCount <= buttonCount) {
        displayedPages = Array.from(
            { length: pageCount },
            (_, index) => index + 1
        );
    } else if (currentPage === firstPage) {
        displayedPages = Array.from(
            { length: buttonCount },
            (_, index) => currentPage + index
        );
    } else if (currentPage === pageCount) {
        displayedPages = Array.from(
            { length: buttonCount },
            (_, index) => pageCount - buttonCount + 1 + index
        );
    } else {
        const pagesBefore = Math.floor(buttonCount / 2);
        const pagesAfter = buttonCount - pagesBefore;

        if (currentPage - pagesBefore <= firstPage) {
            displayedPages = Array.from(
                { length: buttonCount },
                (_, index) => firstPage + index
            );
        } else if (currentPage + pagesAfter >= pageCount) {
            displayedPages = Array.from(
                { length: buttonCount },
                (_, index) => pageCount - buttonCount + 1 + index
            );
        } else {
            displayedPages = Array.from(
                { length: buttonCount },
                (_, index) => currentPage - pagesBefore + index
            );
        }
    }

    const Toolbar: JSX.Element =
        displayedPages && displayedPages.length > 0 ? (
            <>
                <Button
                    isDisabled={!hasPrevPage}
                    onClick={getPrevPage}
                    variant="pg"
                >
                    {'<'}
                </Button>
                {displayedPages.map(page => (
                    <Button
                        isActive={currentPage === page - 1}
                        key={page}
                        onClick={() => setCurrentPage(page - 1)}
                        variant="pg"
                    >
                        {page}
                    </Button>
                ))}
                <Button
                    isDisabled={!hasNextPage}
                    onClick={getNextPage}
                    variant="pg"
                >
                    {'>'}
                </Button>
            </>
        ) : (
            <></>
        );
    return Toolbar;
};

export default usePagination;
