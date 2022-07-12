export type Zone = {
  number: number;
  getFareReturn: (previousZone: number) => number;
};

export const zone1: Zone = {
  number: 1,
  getFareReturn: (previousZone: number) => {
    // traveled in zone 1
    if (previousZone === 1) {
      return 0.7;
    }

    // traveled from 2 to 1
    if (previousZone === 2) {
      return 0.2;
    }

    // traveled from 3 to 2 and then to 1
    if (previousZone === 3) {
      return 0;
    }

    throw new Error(`Invalid previous zone ${previousZone}`);
  },
};

export const zone2: Zone = {
  number: 2,
  getFareReturn: (previousZone: number) => {
    // traveled in zone 1
    if (previousZone === 1) {
      return zone1.getFareReturn(2);
    }

    // traveled inside zone 2
    if (previousZone === 2) {
      return 1.2;
    }

    // traveled to zone 3
    if (previousZone === 3) {
      return 0.95;
    }

    throw new Error(`Invalid previous zone ${previousZone}`);
  },
};

export const zone3: Zone = {
  number: 3,
  getFareReturn: (previousZone: number) => {
    // traveled in zone 1
    if (previousZone === 1) {
      return zone1.getFareReturn(3);
    }

    // traveled to zone 2
    if (previousZone === 2) {
      return 0.95;
    }

    // traveled inside zone 3
    if (previousZone === 3) {
      return 1.2;
    }

    throw new Error(`Invalid previous zone ${previousZone}`);
  },
};
