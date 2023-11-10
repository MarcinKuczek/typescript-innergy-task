import { ServiceType, ServiceYear } from "..";

export class PhotoService
    {
        constructor(
            public type: ServiceType,
            public isMainService: boolean,
            // array of main services that needs to be selected to add this one
            public connectedTo: ServiceType[])
            {
            }
    }