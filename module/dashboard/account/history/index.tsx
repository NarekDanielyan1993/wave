import { Table, type TableColumn } from '@components/table';
import { useAppSelector } from '@store/create-store';
import { historySelector } from '@store/user/selectors';
import { StyledDashboardHeader } from 'module/dashboard/dashboardLayout/style';
import { IHistoryResponse } from 'types';
import { StyledAccountContentWrapper } from '../style';

const History = () => {
    const history = useAppSelector(historySelector);
    const columns: TableColumn<IHistoryResponse>[] =
        history.length > 0
            ? Object.keys(history[0]).map(item => {
                  if (item === 'id' || item === 'userId') {
                      return {
                          id: history[0][item].id,
                          headerName:
                              item.charAt(0).toUpperCase() + item.slice(1),
                          isVisible: false,
                          type: 'text',
                          accessorKey: (person: Person) =>
                              person[item as keyof Person],
                          cellRenderer: (info: any) => info.getValue(),
                      };
                  }
                  return {
                      id: history[0][item].id,
                      headerName: item.charAt(0).toUpperCase() + item.slice(1),
                      isVisible: true,
                      type: 'text',
                      accessorKey: (person: Person) =>
                          person[item as keyof Person],
                      cellRenderer: (info: any) => info.getValue(),
                  };
              })
            : [];

    return (
        <StyledAccountContentWrapper>
            <StyledDashboardHeader as="h3">
                history purchases
            </StyledDashboardHeader>
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
