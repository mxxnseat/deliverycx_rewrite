namespace iiko {
    export enum ResultStateEnum {
        Success = 0,
        RejectByMinSum = 1,
        RejectByWorkTime = 2,
        RejectByZone = 3,
        RejectByStopList = 4,
        RejectByPriceList = 5
    }

    export enum MessageResultStateEnum {
        "_0" = "Доставка была успешна распределена",
        "_1" = "Отклонено по минимальной сумме заказа",
        "_2" = "Отклонено по времени работы заведения",
        "_3" = "В эту зону доставка не осуществляется",
        "_4" = "Продукт из заказа находится в стоп-листе",
        "_5" = "Продукт из заказа запрещен к продаже"
    }

    export interface ICheckResult {
        numState: ResultStateEnum;
        message: MessageResultStateEnum;
    }

    export enum WebhookTypesEnum {
        "StopListUpdate" = "StopListUpdate"
    }

    export interface IWebhookEvent {
        eventType: WebhookTypesEnum.StopListUpdate;
        eventTime: string;
        organizationId: UniqueId;
        correlationId: UniqueId;
        eventInfo: any;
    }

    interface IStopListItem {
        productId: UniqueId;
        balance: number;
    }

    interface IStopListItems {
        organizationId: UniqueId;
        items: Array<IStopListItem>;
    }

    export interface IStopListBody {
        stopList: Array<IStopListItems>;
    }

    export interface IStopListEntity {
        organization: UniqueId;
        stopList: Array<IStopListItems>;
    }

    export class StopListEntity implements IStopListEntity {
        constructor(
            public organization: UniqueId,
            public stopList: Array<IStopListItems>
        ) {}

        public filterNoZeroBalance() {
            console.log("SOME LOGIC");
        }
    }
}
