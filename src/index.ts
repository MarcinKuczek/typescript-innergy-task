import { getConnectedMainServices, getDiscounts, getFullPrice, getRelatedServices, isMainService } from "./services/priceService";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => 
{
    switch(action.type){
        case "Select":{
            // checks if selected service is not already in the array
            // checks if it's one of the related services and has a parent service in the array
            if(!previouslySelectedServices.find(s => s === action.service) &&
                isApplicable(previouslySelectedServices, action.service, false))
                return [ ...previouslySelectedServices, action.service ];
            else
                return previouslySelectedServices;
        }
        case "Deselect":
            // first we filter out deselected service
            // then we check if there are no related services left and if so - removes them
            return removeUnparentedServices(previouslySelectedServices.filter(s => s!==action.service));

        default: return previouslySelectedServices;
    }
    // if(action.type === "Select" && 
    //     // checks if selected service is not already in the array
    //     !previouslySelectedServices.find(s => s === action.service) &&
    //     // checks if it's one of the related services and has a parent service in the array
    //     isApplicable(previouslySelectedServices, action.service, false))
    //         //  creates new array with copied values from the oryginal one plus added a new service
    //         return [ ...previouslySelectedServices, action.service ];

    // else if(action.type === "Deselect")
    //         // first we filter out deselected service
    //         // then we check if there are no related services left and if so - removes them
    //         return removeUnparentedServices(previouslySelectedServices.filter(s => s!==action.service));

    // else
    //     return previouslySelectedServices;
};

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) : { basePrice: number, finalPrice: number } =>
{
    // checks if we have values to calculate
    if (selectedServices == null || selectedServices.length == 0)
        return { basePrice: 0, finalPrice: 0 };

    let basePrice = calculateFullPrice(selectedServices, selectedYear, selectedServices);
    let finalPrice = 0;

    // list that stores services that were already calculated
    let calculatedPriceItems : ServiceType[] = [];

    selectedServices.forEach(selectedService => 
    {
        if (!calculatedPriceItems.find(i => i===selectedService)){

            // gets all discounts defined for this service
            let discountList = getDiscounts(selectedService, selectedYear);

            let currentPrice = calculateFullPrice( [selectedService ], selectedYear, selectedServices);
            let biggestDiscount = 0;

            discountList.forEach(discount =>
            {
                // checks if discount can be applied - all required services are selected by user
                if (containsAll(selectedServices, discount.requires))
                {
                    var fullPrice = calculateFullPrice(discount.appliesTo, selectedYear, selectedServices);
                    var currentDiscount = fullPrice - discount.price;
                    
                    // check if this discount is bigger than what we have
                    if (biggestDiscount <=  currentDiscount)
                    {
                        biggestDiscount = currentDiscount;
                        currentPrice = discount.price;

                        // add services that are affected by this discount to list that holds calculated items
                        calculatedPriceItems = calculatedPriceItems.concat(discount.appliesTo);
                    }

                }
            });

            finalPrice += currentPrice;
        }
        });
        
    return { basePrice, finalPrice };
}


const calculateFullPrice = (servicesToCalculate: ServiceType[], year: ServiceYear, selectedServices: ServiceType[]) : number =>
{
    let fullPrice = 0;
    servicesToCalculate.forEach(service =>
    {
        // checks if this is one of the related services and selectedServices contains it's parent
        if (isApplicable(selectedServices, service, true))
            fullPrice += getFullPrice(service, year);
    });

    return fullPrice;
}

// cheks if all requiredServices are present in Services array
const containsAll = (services: ServiceType[], requiredServices: ServiceType[]) : boolean =>
{
    let contains = true;
    requiredServices.forEach(requiredService =>
    {
        if (!services.find(s => s === requiredService))
            contains = false;
    });

    return contains;
}

// cheks if at least one of the requiredServices is present in Services array
const containsOne = (services: ServiceType[], requiredServices: ServiceType[]) : boolean =>
{
    let contains = false;
    requiredServices.forEach(requiredService =>
    {
        if (services.find(s => s === requiredService))
            contains = true;
    });

    return contains;
}

const isApplicable = (selectedServices: ServiceType[], service: ServiceType, containsAllElements: boolean) : boolean =>
{
    if(isMainService(service))
        return true;

    let connectedServices = getConnectedMainServices(service);
    
    if(containsAllElements)
        return containsAll(selectedServices, connectedServices);

    return containsOne(selectedServices, connectedServices);
}

const removeUnparentedServices = (store: ServiceType[]): ServiceType[] =>
{
    let newStore: ServiceType[] = [...store];
    let reletedServices = getRelatedServices();

    reletedServices.forEach(service => 
    {
        // checks if this related service has at least one parrent in the store
        if(!containsOne(newStore, service.connectedTo))
            newStore = newStore.filter(s => s !== service.type);
    });
    return newStore;
}
