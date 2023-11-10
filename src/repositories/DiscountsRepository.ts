import { Discount } from "../models/Discount";

// Simulates rules for discounts saved in the database
export const discountsRepository: Discount[] =
        [
            // rule: wedding session costs regularly $600, but in a package with photography during the wedding or with a video recording it costs $300,
            new Discount(2020, 300, [ "WeddingSession", "Photography"], [ "WeddingSession" ] ),
            new Discount(2021, 300, ["WeddingSession", "Photography"], ["WeddingSession" ] ),
            new Discount(2022, 300,["WeddingSession","Photography"] , ["WeddingSession" ]),

            new Discount(2020, 300, [ "WeddingSession", "VideoRecording"], [ "WeddingSession" ] ),
            new Discount(2021, 300, ["WeddingSession", "VideoRecording"], ["WeddingSession" ] ),
            new Discount(2022, 300,["WeddingSession","VideoRecording"] , ["WeddingSession" ]),

            // rule: wedding session is free if the client chooses Photography during the wedding in 2022,
            new Discount(2022, 0, ["WeddingSession", "Photography"], ["WeddingSession"]),

            // rule: package of photography + video costs less: $2200 in 2020, $2300 in 2021 and $2500 in 2022,
            new Discount(2020, 2200, ["Photography", "VideoRecording"],["Photography", "VideoRecording" ]),
            new Discount(2021, 2300, ["Photography", "VideoRecording"],["Photography", "VideoRecording" ]),
            new Discount(2022, 2500, ["Photography", "VideoRecording"],["Photography", "VideoRecording" ]),
        ];