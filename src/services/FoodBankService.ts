import { Injectable } from '@angular/core';

interface LabelledUrl {
    name: string;
    domain: string;
}

@Injectable()
export class FoodBankService {
    FBS: LabelledUrl[] = [
        { name: "Feeding Texas", domain: "feedingtexas.org" },
        { name: "Brazos Valley Food Bank", domain: "bvfb.org" },
        { name: "Central Texas Food Bank", domain: "centraltexasfoodbank.org" },
        { name: "Concho Valley Food Bank", domain: "conchovalleyfoodbank.org" },
        { name: "Feeding America", domain: "feedingamerica.org" },
        { name: "Galveston County Food Bank", domain: "galvestoncountyfoodbank.org" },
        { name: "Houston Food Bank", domain: "houstonfoodbank.org" },
        { name: "Montgomery County Food Bank", domain: "mcfoodbank.org" },
        { name: "Food Bank of the Rio Grande Valley", domain: "foodbankrgv.org" },

        { name: "North Texas Food Bank", domain: "ntfb.org" },
        { name: "South Plains Food Bank", domain: "spfb.org" },
        { name: "San Antonio Food Bank", domain: "safoodbank.org" },
        { name: "South Texas Food Bank", domain: "southtexasfoodbank.org" },
        { name: "Southeast Texas Food Bank", domain: "setxfoodbank.org" },
        { name: "Tarrant Area Food Bank", domain: "tafb.org" },
        { name: "Wichita Falls Area Food Bank", domain: "wfafb.org" },
        { name: "East Texas Food Bank", domain: "easttexasfoodbank.org" },
         { name: "Generic Food Bank", domain: "foodbank.org" },



    ];

}