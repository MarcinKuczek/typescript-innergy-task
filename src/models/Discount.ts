import { ServiceType, ServiceYear } from "..";

export class Discount
    {
        constructor(
            public year: ServiceYear,
            public price: number,
            // Items that needs to be present in shopping card to apply this discount
            public requires: ServiceType[],
            // List of services that altogether costs this price. This can be one or more items
            public appliesTo: ServiceType[])
            {
            }
    }