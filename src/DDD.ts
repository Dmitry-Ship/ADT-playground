type Cash = {
  type: "cash";
};

type Check = {
  type: "check";
  checkNumber: number;
};

type CardNumber = number;

type Card = {
  type: "card";
  cardType: "Visa" | "MasterCard";
  cardNumber: CardNumber;
};

type PaymentMethod = Cash | Check | Card;

type Currency = "USD" | "EURO";

type Payment = {
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
};
const myPayment: Payment = {
  amount: 100,
  currency: "EURO",
  paymentMethod: {
    type: "card",
    cardNumber: 123,
    cardType: "MasterCard",
  },
};

type Size = "XS" | "S" | "M" | "L" | "XL";

type DocumentsParcel = {
  parcelType: "documents";
};

type BoxParcel = {
  parcelType: "box";
  weight: number;
  size: Size;
};

type SpecialParcel = {
  parcelType: "special";
  weight: number;
  size: Size;
  description: string;
};

export type Parcel = DocumentsParcel | BoxParcel | SpecialParcel;

const validateParcel = (parcel: Parcel): boolean => {
  switch (parcel.parcelType) {
    case "documents":
      return true;
    case "box":
      return parcel.weight < 1000;
    case "special":
      return parcel.description !== "";
    default: {
      const _exhaustiveCheck: never = parcel;
      return false;
    }
  }
};
