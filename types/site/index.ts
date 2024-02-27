export interface ISite {
    address: string;
    hours: string;
    phone: string;
    email: string;
}

export interface ISiteImage {
    url: string;
    name: string;
    publicId: string;
}

export interface ISiteDeleteImageBody {
    id: string;
    publicId: string;
}

export type siteQueryParams = {
    siteId: string;
};

export interface ISiteResponse {
    id: string;
    address: string;
    hours: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ISiteOptional = Partial<ISite>;

export interface ISiteService {
    getSiteArgs(): Promise<ISiteResponse | null>;
    createSite(site: ISite): Promise<ISiteResponse | null>;
    updateSiteArgs(is: string, site: ISite): Promise<ISiteResponse | null>;
    // getProductById(id: string): Promise<ISiteResponse | null>;
    // updateProduct(site: ISiteOptional): Promise<ISiteResponse | null>;
}
