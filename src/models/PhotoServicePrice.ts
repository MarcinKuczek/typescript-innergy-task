import { ServiceType, ServiceYear } from "..";
import { PhotoService } from "./PhotoService";

export class PhotoServicePrice
    {
        constructor(
            public year: ServiceYear,
            public price: number,
            public photoService: PhotoService)
            {
            }
    }