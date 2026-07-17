export type CompanyCreationForm = {
    companyName: string;
    companyEmail: string;
    companyPhone: string | null;
    companyAddress: CompanyAddressForm | null;
    companyWebsite: string | null;
    companyDescription: string | null;
};

export type CompanyAddressForm = {
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
};

export type DepartmentCreationForm = {
    departmentName: string;
    departmentDescription: string;
};


export type JobCreationForm = {
    jobTitle: string;
    jobDescription: string | null;
    jobLocation: string;
    jobStatus: string;
};

export type InterviewScheduleForm = {
    jobApplyId: number;
    interviewDateTime: string; // ISO 8601 format
    interviewLocation: string | null;
    interviewMode: string | null;
    interviewStatus: string | null;
    interviewerUserId: number;
};
