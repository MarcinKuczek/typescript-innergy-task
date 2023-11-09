import { ServiceType, ServiceYear } from "..";
import { Discount } from "../models/Discount";
import { DiscountsRepository } from "../repositories/DiscountsRepository";
import { PricesRepository } from "../repositories/PricesRepository";

export const GetFullPrice = (selectedService: ServiceType, year: ServiceYear) : number =>
{
    let pricing = PricesRepository.find(p => p.year == year);

    switch (selectedService)
    {
        case "Photography": return pricing.photography;
        case "VideoRecording": return pricing.videoRecording;
        case "WeddingSession": return pricing.weddingSession;
        case "BlurayPackage": return pricing.blurayPackage;
        case "TwoDayEvent": return pricing.twoDayEvent;

        default: return 0;
    }
}

export const GetDiscounts=(year: ServiceYear, selectedService: ServiceType ) : Discount[] =>
{
    return DiscountsRepository.filter(p => p.year === year && p.appliesTo.find(a => a ===selectedService));
}