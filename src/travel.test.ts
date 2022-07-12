import { OysterCard } from "./oyster-card";
import { Station } from "./station";
import { TravelManager } from "./travel-manager";
import { zone1, zone2, zone3 } from "./zone";

const initialCardBalance = 30;
let oysterCard: OysterCard;
let travelManager: TravelManager;

describe("TravelManager", () => {
  // reset card before each test
  beforeEach(() => {
    oysterCard = new OysterCard();
    oysterCard.add(initialCardBalance);
    travelManager = new TravelManager(oysterCard);
  });

  it("should be able to enter a station", () => {
    const station: Station = {
      name: "A",
      zone: zone1,
    };

    travelManager.enterStation(station);
    expect(travelManager.lastEnteredZone).toBe(station.zone);
  });

  it("should be able to leave a station", () => {
    const stationA: Station = {
      name: "A",
      zone: zone1,
    };

    const stationB = {
      name: "B",
      zone: zone2,
    };

    travelManager.enterStation(stationA);
    travelManager.leaveStation(stationB);
    expect(travelManager.lastEnteredZone).toBe(stationB.zone);
  });

  it("should be charged the maximum amount of 3.2 pounds for entering a station and not leaving", () => {
    const station: Station = {
      name: "A",
      zone: zone3,
    };

    travelManager.enterStation(station);
    expect(oysterCard.balance).toBe(initialCardBalance - 3.2);
  });

  it("should be able to travel by bus", () => {
    const station = {
      name: "A",
      zone: zone1,
    };

    travelManager.travelByBus(station);
    expect(travelManager.oysterCard.balance).toBe(initialCardBalance - 1.8);
  });

  it("should be charged with 2.5 pounds for transit within zone 1", () => {
    const stationInZone1: Station = {
      name: "A",
      zone: zone1,
    };

    travelManager.enterStation(stationInZone1);
    travelManager.leaveStation(stationInZone1);
    expect(travelManager.oysterCard.balance).toBe(initialCardBalance - 2.5);
  });

  it("should be charged with  3 pounds for transit within from zone 1 to zone 2", () => {
    const stationInZone1: Station = {
      name: "A",
      zone: zone1,
    };

    const stationInZone2: Station = {
      name: "B",
      zone: zone2,
    };

    travelManager.enterStation(stationInZone1);
    travelManager.leaveStation(stationInZone2);
    expect(travelManager.oysterCard.balance).toBe(initialCardBalance - 3);
  });

  it("should be charged with  3.2 pounds for transit within from zone 1 to zone 3 (traveled through 3 zones)", () => {
    const stationInZone1: Station = {
      name: "A",
      zone: zone1,
    };

    const stationInZone3: Station = {
      name: "C",
      zone: zone3,
    };

    travelManager.enterStation(stationInZone1);
    travelManager.leaveStation(stationInZone3);
    expect(travelManager.oysterCard.balance).toBe(initialCardBalance - 3.2);
  });

  it(`Traveling:
    - Tube Holborn(1) to Earl's Court(1,2) // treated as zone 1
    - 328 bus from Earl's Court(1) to Chelsea(1 according to google)
    - Tube Earl's court(1) to Hammersmith(2)
    Should cost  2.5 + 1.8 + 3 = 7.3 pounds
  `, () => {
    const Holborn: Station = {
      name: "Holborn",
      zone: zone1,
    };

    const Chelsea: Station = {
      name: "Chelsea",
      zone: zone1,
    };

    const EarlsCourt: Station = {
      name: "Earl's Court",
      zone: zone1,
    };

    const Hammersmith: Station = {
      name: "Hammersmith",
      zone: zone2,
    };

    travelManager.enterStation(Holborn);
    travelManager.leaveStation(EarlsCourt);
    travelManager.travelByBus(Chelsea);
    travelManager.enterStation(EarlsCourt);
    travelManager.leaveStation(Hammersmith);
    expect(travelManager.oysterCard.balance).toBe(initialCardBalance - 7.3);
  });
});
