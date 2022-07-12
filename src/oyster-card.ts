export class OysterCard {
  balance: number;
  lastEnteredZone: number;

  constructor() {
    this.balance = 0;
  }

  add(amount: number): void {
    this.balance += amount;
  }

  deduct(amount: number): void {
    this.balance -= amount;
  }

  showBalance(): void {
    console.log(this.balance);
  }
}
