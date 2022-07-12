import { Station } from "./station";
import { OysterCard } from "./oyster-card";
import { Zone } from "./zone";

export class TravelManager {
  lastEnteredZones: Zone[];
  oysterCard: OysterCard;

  private busFare = 1.8;
  private maxFare = 3.2;

  constructor(oysterCard: OysterCard) {
    this.oysterCard = oysterCard;
  }

  enterStation = (station: Station) => {
    this.oysterCard.deduct(this.maxFare);
    this.lastEnteredZones = station.zones;
  };

  leaveStation = (station: Station) => {
    const newZones = station.zones;

    const possibleReimbursements: number[] = [];
    newZones.forEach((newZone) => {
      const previousZones = this.lastEnteredZones;

      previousZones.forEach((previousZone) => {
        const fareReturn = newZone.getFareReturn(previousZone.number);
        possibleReimbursements.push(fareReturn);
      });
    });

    const maxReimbursement = Math.max(...possibleReimbursements);

    this.oysterCard.add(maxReimbursement);
    this.lastEnteredZones = station.zones;
  };

  travelByBus = (station: Station) => {
    this.lastEnteredZones = station.zones;
    this.oysterCard.deduct(this.busFare);
  };
}
