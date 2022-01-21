export enum HTTP_METHODS {
    GET = "GET",
    POST = "POST"
}

export enum VATS {
    VAT20 = "vat20",
    VAT10 = "vat10",
    VAT120 = "vat120",
    VAT110 = "vat110",
    VAT0 = "vat0",
    NOVAT = "no_vat"
}

export enum AGENT_TYPES {
    /*
        Оказание услуг покупателю (клиенту) пользователем,
        являющимся банковским платежным агентом банковским платежным агентом
    */
    "BANK_AGENT" = 0,

    /*
        Оказание услуг покупателю (клиенту) пользователем,
        являющимся банковским платежным агентом банковским платежным субагентом
    */
    "BANK_SUBAGENT" = 1,

    /*
        Оказание услуг покупателю (клиенту) пользователем,
        являющимся платежным агентом
    */
    "PAYMENT_AGENT" = 2,

    /*
        Оказание услуг покупателю (клиенту) пользователем,
        являющимся платежным субагентом
    */
    "PAYMENT_SUBAGENT" = 3,

    /*
        Осуществление расчета с покупателем (клиентом) пользователем,
        являющимся поверенным
    */
    "VERIFIED_USER" = 4,

    /*
        Осуществление расчета с покупателем (клиентом) пользователем,
        являющимся комиссионером
    */
    "COMMISSIONER_USER" = 5,

    /*
        	Осуществление расчета с покупателем (клиентом) пользователем,
            являющимся агентом и не являющимся банковским платежным агентом (субагентом),
            платежным агентом (субагентом), поверенным, комиссионером
    */
    "CLEAR_AGENT" = 6
}

export enum PAYMENT_TYPES {
    "FULL_PAYMENT" = 1,
    "PARTIAL_PAYMENT" = 2,
    "PREPAID_PAYMENT" = 3,
    "FULL_PLUS_PREPAID_PAYMENT" = 4
}

export enum SUBJECT_TYPES {
    "PRODUCT" = 1
}

export enum STATUSES {
    "SUCCESS" = 0
}

export enum ERROR_CODES {
    "UNKNOWN_ERROR" = -1,
    "UNKNOWN_NETWORK_ERROR" = -2,
    "PAYMENT_NETWORK_ERROR" = -3,
    "FORBIDDEN_ERROR" = -6,
    "INVALID_SIGNATURE_ERROR" = -7,
    "SELLER_REFUSE_ERROR" = -8,
    "BILL_TIMEOUT_ERROR" = -9,
    "PAYMENT_SERVICE_ERROR" = -10,
    "REFUND_IMPOSSIBLE_ERROR" = -11,
    "REFUND_EXCESS_ERROR" = -12,
    "ID_NOT_FOUND_ERROR" = -13,
    "ID_EXISTS_ERROR" = -14,
    "WAITING_PERIOD_TIMEOUT_ERROR" = -15,
    "SIMULATION_ERROR" = -16,
    "PAYMENT_EXCESS_ERROR" = -17,
    "NOT_VALIDSUM_ERROR" = -18,
    "INSUFFICIENT_FUNDS_ERROR" = -19,
    "INTERNAL_ERROR" = -20,
    "PREVIOUS_PAYMENT_NOT_FINISHED" = -21,
    "EXCESS_AUTH_ERROR" = -22,
    "ACTION_NOT_MATCH_STATUS_ERROR" = -23,
    "PAYMENT_SERVICE_DISABLE_ERROR" = -24,
    "3DSEC_ERROR" = -25,
    "NOT_VALID_CARD_NUMBER_ERROR" = -26,
    "EXPIRES_YEAR_CARD_ERROR" = -27,
    "CARD_IS_BLOCKED_ERROR" = -28,
    "TOTAL_SUM_LIMIT_ERROR" = -29,
    "TOTAL_COUNT_LIMIT_ERROR" = -30,
    "NOT_VALID_ACTION_ERROR" = -31
}
