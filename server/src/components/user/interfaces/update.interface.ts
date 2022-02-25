export interface IUpdateProps {
    name?: string;
    phone?: string;
    address?: {
        street: string;
        home: number;
    };
    email?: string;
    organizationId?: string;
}
