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

const isApplicable = (services: ServiceType[], service: ServiceType) : boolean =>
{
    if (service === "BlurayPackage" && !services.find(s=> s === "VideoRecording"))
        return false;
    if (service === "TwoDayEvent" && !(services.find(s=> s==="VideoRecording") || services.find(s=> s === "Photography")))
        return false;

    return true;
}