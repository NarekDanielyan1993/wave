import { PrismaClient } from '@prisma/client';
import { config } from '../utils/config';

let prismaAdapter: PrismaClient;

if (!config.isDev) {
    prismaAdapter = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prismaAdapter = global.prisma;
}

export default prismaAdapter;
