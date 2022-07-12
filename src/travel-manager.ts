import { Station } from "./station";
import { OysterCard } from "./oyster-card";
import { Zone } from "./zone";

export class TravelManager {
  lastEnteredZone: Zone;
  oysterCard: OysterCard;

  private busFare = 1.8;
  private maxFare = 3.2;

  constructor(oysterCard: OysterCard) {
    this.oysterCard = oysterCard;
  }

  enterStation = (station: Station) => {
    this.oysterCard.deduct(this.maxFare);
    this.lastEnteredZone = station.zone;
  };

  leaveStation = (station: Station) => {
    const reimbursement = station.zone.getFareReturn(
      this.lastEnteredZone.number
    );

    this.oysterCard.add(reimbursement);
    this.lastEnteredZone = station.zone;
  };

  travelByBus = (station: Station) => {
    this.lastEnteredZone = station.zone;
    this.oysterCard.deduct(this.busFare);
  };
}
