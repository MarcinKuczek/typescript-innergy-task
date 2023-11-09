import { GetDiscounts, GetFullPrice } from "./services/PriceService";

export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => [];

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) =>
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
            let discountList = GetDiscounts(selectedYear, selectedService);

            let currentPrice = calculateFullPrice( [selectedService ], selectedYear, selectedServices);
            let biggestDiscount = 0;

            discountList.forEach(discount =>
            {
                // checks if discount can be applied
                if (meetsRequirements(selectedServices, discount.requires))
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


const calculateFullPrice = (servicesToCalculate: ServiceType[], year: ServiceYear, selectedServicesList: ServiceType[]) : number =>
{
    let fullPrice = 0;
    servicesToCalculate.forEach(service =>
    {
        // checks if there are no limitations for this service to add it to full Price
        if (isApplicable(selectedServicesList, service))
            fullPrice += GetFullPrice(service, year);
    });

    return fullPrice;
}

// cheks if items requiredServices are present in Services selected by the user
const meetsRequirements = (services: ServiceType[], requiredServices: ServiceType[]) : boolean =>
{
    let meetsRequirements = true;
    requiredServices.forEach(requiredService =>
    {
        if (!services.find(s => s===requiredService))
            meetsRequirements = false;
    });

    return meetsRequirements;
}

const isApplicable = (services: ServiceType[], service: ServiceType) : boolean =>
{
    if (service === "BlurayPackage" && !services.find(s=> s === "VideoRecording"))
        return false;
    if (service === "TwoDayEvent" && !(services.find(s=> s==="VideoRecording") || services.find(s=> s === "Photography")))
        return false;

    return true;
}