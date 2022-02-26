//util types
type ReturnTypeAsync<T extends (...args) => any> = T extends (
    ...args
) => Promise<infer R>
    ? R
    : any;

type UniqueId = string;
type ImagePath = string;
type Token = string;
type RedirectURI = string | null;
type Email = string;

type ExpiresType = {
    year: string;
    month: string;
};

//Iiko responses
interface OrderInfoIiko {
    address: {
        city: string;
        street: string;
        home: string;
        apartament: string;
        entrance: string;
        floor: string;
        doorphone: string;
        comment: string;
    };
    sum: number;
    status: string;
    number: string;
    durationInMinutes: number;
    problem?: {
        hasProblem: boolean;
        problem: string;
    };
}

interface OrderCheckCreationResult {
    problem: string;
    resultState: ResultStateEnum;
}

interface OrderTypesIiko {
    items: Array<{
        id: UniqueId;
        name: string;
        orderServiceType: string;
        externalRevision: number;
    }>;
}

enum DeliveryStatusEnum {
    "NEW" = "Новая",
    "AWAITING_DELIVERY" = "Ждет отправки",
    "ON_THE_WAY" = "В пути",
    "CLOSED" = "Закрыта",
    "CANCELLED" = "Отменена",
    "DELIVERED" = "Доставлена",
    "NOT_COMFIRMED" = "Не подтверждена",
    "COOKING" = "Готовится",
    "DONE" = "Готово"
}
