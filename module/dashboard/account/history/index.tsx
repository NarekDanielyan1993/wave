import { Table, type TableColumn } from '@components/table';
import { useAppSelector } from '@store/create-store';
import { historySelector } from '@store/user/selectors';
// import { StyledDashboardHeader } from 'module/dashboard/dashboardLayout/style';
import { capitalizeFirstLetter } from '@utils/helper';
import PageTitle from 'module/dashboard/dashboardLayout/pageTitle';
import { IHistoryResponse } from 'types';
import { StyledAccountContentWrapper } from '../style';

const History = () => {
    const history = useAppSelector(historySelector);
    const columns: TableColumn<IHistoryResponse>[] =
        history.length > 0
            ? Object.keys(history[0]).map(item => ({
                  id: history[0][item].id,
                  headerName: capitalizeFirstLetter(item),
                  isVisible: !(item === 'userId' || item === 'id'),
                  type: 'text',
                  accessorKey: (person: Person) => person[item as keyof Person],
                  cellRenderer: (info: any) => info.getValue(),
              }))
            : [];

    return (
        <StyledAccountContentWrapper>
            <PageTitle>history purchases</PageTitle>
            <Table<IHistoryResponse>
                cols={columns}
                data={history}
                paginationData={{
                    limit: 5,
                    totalItems: history.length,
                    page: 1,
                }}
            />
        </StyledAccountContentWrapper>
    );
};

export default History;
