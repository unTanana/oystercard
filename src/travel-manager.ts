import { Station } from "./station";
import { OysterCard } from "./oyster-card";
import { Zone } from "./zone";

export class TravelManager {
  lastEnteredZone: Zone;
  oysterCard: OysterCard;

  private busFare = 1.8;

  constructor(oysterCard: OysterCard) {
    this.oysterCard = oysterCard;
  }

  enterStation = (station: Station) => {
    this.lastEnteredZone = station.zone;
  };

  leaveStation = (station: Station) => {
    const fare = station.zone.getFare(this.lastEnteredZone.number);
    this.oysterCard.deduct(fare);
    this.lastEnteredZone = station.zone;
  };

  travelByBus = (station: Station) => {
    this.lastEnteredZone = station.zone;
    this.oysterCard.deduct(this.busFare);
  };
}
