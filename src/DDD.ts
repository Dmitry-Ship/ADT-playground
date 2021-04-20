type Cash = {
  type: "cash";
  isChangeRequired: boolean;
};

type CardNumber = number;

type Card = {
  type: "card";
  cardType: "Visa" | "MasterCard";
  cardNumber: CardNumber;
};

type PaymentMethod = Cash | Card;

type Currency = "USD" | "EURO";

type Payment = {
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
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

type Parcel = DocumentsParcel | BoxParcel | SpecialParcel;

type RegisteredOrder = {
  status: "registered";
  parcel: Parcel;
};

type AssignedOrder = {
  status: "assigned";
  parcel: Parcel;
  courier: number;
};

type ExecutingOrder = {
  status: "executing";
  parcel: Parcel;
  courier: number;
  address: string;
};

type CompletedOrder = {
  status: "completed";
  parcel: Parcel;
  payment: Payment;
  courier: number;
};

export type Order =
  | RegisteredOrder
  | AssignedOrder
  | ExecutingOrder
  | CompletedOrder;
