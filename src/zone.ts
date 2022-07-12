export type Zone = {
  number: number;
  getFare: (previousZone: number) => number;
};

export const zone1: Zone = {
  number: 1,
  getFare: (previousZone: number) => {
    // traveled in zone 1
    if (previousZone === 1) {
      return 2.5;
    }

    // traveled from 2 to 1
    if (previousZone === 2) {
      return 3.0;
    }

    // traveled from 3 to 2 and then to 1
    if (previousZone === 3) {
      return 3.2;
    }

    throw new Error(`Invalid previous zone ${previousZone}`);
  },
};

export const zone2: Zone = {
  number: 2,
  getFare: (previousZone: number) => {
    // traveled in zone 1
    if (previousZone === 1) {
      return zone1.getFare(2);
    }

    // traveled inside zone 2
    if (previousZone === 2) {
      return 2;
    }

    // traveled to zone 3
    if (previousZone === 3) {
      return 2.25;
    }

    throw new Error(`Invalid previous zone ${previousZone}`);
  },
};

export const zone3: Zone = {
  number: 3,
  getFare: (previousZone: number) => {
    // traveled in zone 1
    if (previousZone === 1) {
      return zone1.getFare(3);
    }

    // traveled to zone 2
    if (previousZone === 2) {
      return 2.25;
    }

    // traveled inside zone 3
    if (previousZone === 3) {
      return 2;
    }

    throw new Error(`Invalid previous zone ${previousZone}`);
  },
};
