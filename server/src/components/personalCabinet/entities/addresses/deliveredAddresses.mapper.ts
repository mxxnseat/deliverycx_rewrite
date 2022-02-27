import { Mapper } from "src/common/abstracts/mapper.interface";
import { DeliveredAddressClass } from "src/database/models/deliveryAddresses.model";
import { DeliveryAddressEntity } from "./deliveryAddresses.entity";

export const deliveredAddressMapper: Mapper<
    Array<DeliveredAddressClass>,
    Array<DeliveryAddressEntity>
> = (p) => {
    return p.map((el) => {
        return new DeliveryAddressEntity(el.name, {
            address: el.address,
            city: el.city
        });
    });
};
