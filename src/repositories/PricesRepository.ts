import { PhotoService } from "../models/PhotoService";
import { PhotoServicePrice } from "../models/PhotoServicePrice";
    
export const pricesRepository: PhotoServicePrice[] =
[
    new PhotoServicePrice(2020, 1700, new PhotoService("Photography", true, [])),
    new PhotoServicePrice(2021, 1800, new PhotoService("Photography", true, [])),
    new PhotoServicePrice(2022, 1900, new PhotoService("Photography", true, [])),
    new PhotoServicePrice(2020, 1700, new PhotoService("VideoRecording", true, [])),
    new PhotoServicePrice(2021, 1800, new PhotoService("VideoRecording", true, [])),
    new PhotoServicePrice(2022, 1900, new PhotoService("VideoRecording", true, [])),
    new PhotoServicePrice(2020, 600, new PhotoService("WeddingSession", true, [])),
    new PhotoServicePrice(2021, 600, new PhotoService("WeddingSession", true, [])),
    new PhotoServicePrice(2022, 600, new PhotoService("WeddingSession", true, [])),
    new PhotoServicePrice(2020, 400, new PhotoService("TwoDayEvent", false, ["Photography", "VideoRecording"])),
    new PhotoServicePrice(2021, 400, new PhotoService("TwoDayEvent", false, ["Photography", "VideoRecording"])),
    new PhotoServicePrice(2022, 400, new PhotoService("TwoDayEvent", false, ["Photography", "VideoRecording"])),
    new PhotoServicePrice(2020, 300, new PhotoService("BlurayPackage", false, ["VideoRecording"])),
    new PhotoServicePrice(2021, 300, new PhotoService("BlurayPackage", false, ["VideoRecording"])),
    new PhotoServicePrice(2022, 300, new PhotoService("BlurayPackage", false, ["VideoRecording"])),
];

export const servicesRepository: PhotoService[] =
[
    new PhotoService("Photography", true, []),
    new PhotoService("VideoRecording", true, []),
    new PhotoService("WeddingSession", true, []),
    new PhotoService("TwoDayEvent", false, ["Photography", "VideoRecording"]),
    new PhotoService("BlurayPackage", false, ["VideoRecording"])
];