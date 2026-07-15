export type Company = {
    companyId: number;
    companyName: string;
    companyEmail: string;
    companyDescription: string | null;
    companyWebsite: string | null;
    companyPhone: string | null;
    companyLogo: string | null;
    companyAddress: {
        city: string | null;
        country: string | null;
        state: string | null;
        street: string | null;
        zipCode: string | null;
    } | null;
}

export type CompaniesResponse = {
    code: number;
    result: Company[];
}