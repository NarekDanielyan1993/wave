import axios from 'axios';

const mockAxios = jest.createMockFromModule('axios') as jest.Mocked<
    typeof axios
>;
mockAxios.create = jest.fn(() => axios);
mockAxios.interceptors = {
    request: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
};

export default mockAxios;
