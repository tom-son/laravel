import moment from "moment";

const dollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatToCurrency(price: number): string {
  return dollarFormatter.format(price);
}

export function formatDateShort(date: Date): string {
  return moment(new Date(date)).format("DD/MM");
}

export function formatDateFull(date: Date): string {
  return moment(new Date(date)).format("DD/MM/YYYY");
}
