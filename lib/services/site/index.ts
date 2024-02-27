import prismaAdapter from '@lib/db';
import { PrismaClient } from '@prisma/client';
import { ISite, ISiteOptional, ISiteResponse, ISiteService } from 'types/site';

class SiteService implements ISiteService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient = prismaAdapter) {
        this.prisma = prisma;
    }

    async getSiteArgs(): Promise<ISiteResponse | null> {
        const sites: ISiteResponse[] = await this.prisma.site.findMany();
        return sites[0];
    }

    async createSite(site: ISite): Promise<ISiteResponse | null> {
        const createdSite: ISiteResponse = await this.prisma.site.create({
            data: site,
        });
        return createdSite;
    }

    async uploadSiteImage(site: ISite): Promise<ISiteResponse | null> {
        const createdSite: ISiteResponse = await this.prisma.site.create({
            data: site,
        });
        return createdSite;
    }

    async updateSiteArgs(
        id: string,
        site: ISiteOptional
    ): Promise<ISiteResponse | null> {
        const createdSite: ISiteResponse = await this.prisma.site.update({
            where: {
                id,
            },
            data: site,
        });
        return createdSite;
    }
}

export default SiteService;
