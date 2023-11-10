import { ServiceType, ServiceYear } from "..";
import { Discount } from "../models/Discount";
import { PhotoService } from "../models/PhotoService";
import { discountsRepository } from "../repositories/discountsRepository";
import { pricesRepository, servicesRepository } from "../repositories/pricesRepository";

export const getFullPrice = (service: ServiceType, year: ServiceYear) : number =>
{
    let pricingItem = pricesRepository.find(p => p.year === year && p.photoService.type === service);

    if(pricingItem)
        return pricingItem.price;

    return 0;
}

export const getDiscounts = (service: ServiceType, year: ServiceYear ) : Discount[] =>
{
    return discountsRepository.filter(discount => discount.year === year && discount.appliesTo.find(a => a === service));
}

export const isMainService = (service: ServiceType ) : boolean =>
{
    let serviceItem = servicesRepository.find(photoService => photoService.type === service);
    if(serviceItem)
        return serviceItem.isMainService;

    return false;
}

export const getConnectedMainServices = (service: ServiceType ) : ServiceType[] =>
{
    let serviceItem = servicesRepository.find(photoService => photoService.type === service);
    if(serviceItem)
        return serviceItem.connectedTo;

    return [];
}

export const getConnectedRelatedServices = (service: ServiceType ) : ServiceType[] =>
{
    let serviceItem = servicesRepository.find(photoService => photoService.type === service);
    if(serviceItem)
        return serviceItem.connectedTo;

    return [];
}

export const getRelatedServices = () : PhotoService[] =>
{
    return servicesRepository.filter(photoService => !photoService.isMainService);
}