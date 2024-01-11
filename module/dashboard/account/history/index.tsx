import { Table, type TableColumn } from '@components/table';
import { StyledDashboardHeader } from 'module/dashboard/dashboardLayout/style';
import { StyledAccountContentWrapper } from '../style';

const History = () => {
    type Person = {
        id: number;
        firstName: string;
        lastName: string;
        age: number;
        visits: number;
        status: string;
        progress: number;
    };

    const bodyData: Person[] = [
        {
            id: 1,
            firstName: 'tanner',
            lastName: 'linsley',
            age: 24,
            visits: 100,
            status: 'In Relationship',
            progress: 50,
        },
        {
            id: 2,
            firstName: 'tandy',
            lastName: 'miller',
            age: 40,
            visits: 40,
            status: 'Single',
            progress: 80,
        },
        {
            id: 3,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 4,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 5,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 6,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 7,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 8,
            firstName: 'tanner',
            lastName: 'linsley',
            age: 24,
            visits: 100,
            status: 'In Relationship',
            progress: 50,
        },
        {
            id: 9,
            firstName: 'tandy',
            lastName: 'miller',
            age: 40,
            visits: 40,
            status: 'Single',
            progress: 80,
        },
        {
            id: 10,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 11,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 12,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 13,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
        {
            id: 14,
            firstName: 'joe',
            lastName: 'dirte',
            age: 45,
            visits: 20,
            status: 'Complicated',
            progress: 10,
        },
    ];

    const columns: TableColumn<Person>[] = Object.keys(bodyData[0]).map(
        item => ({
            id: bodyData[0][item].id,
            headerName: item,
            isVisible: true,
            type: 'text',
            accessorKey: (person: Person) => person[item as keyof Person],
            cellRenderer: (info: any) => info.getValue(),
        })
    );

    return (
        <StyledAccountContentWrapper>
            <StyledDashboardHeader as="h3">
                history purchases
            </StyledDashboardHeader>
            <Table<Person>
                cols={columns}
                data={bodyData}
                paginationData={{ limit: 5, totalItems: 14, page: 1 }}
            />
        </StyledAccountContentWrapper>
    );
};

export default History;
