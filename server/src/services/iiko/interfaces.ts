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
    "_4" = "Продукт из заказа находятся в стоп-листе",
    "_5" = "Продукт из заказа запрещен к продаже"
}

export interface ICheckResult {
    numState: ResultStateEnum;
    message: MessageResultStateEnum;
}
