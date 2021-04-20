import { IEither, Left, Right } from "./monads/either";

type Size = "XS" | "S" | "M" | "L" | "XL";

type DocumentsParcel = { parcelType: "documents" };

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
export type ParcelWithCourier = Parcel & { courierId: number };

const setCourier = (courierId: number) => (
  parcel: Parcel
): ParcelWithCourier => {
  return { ...parcel, courierId };
};

const validateParcel = (parcel: Parcel): IEither<string, Parcel> => {
  switch (parcel.parcelType) {
    case "documents":
      return Right(parcel);
    case "box":
      return parcel.weight > 0 ? Right(parcel) : Left("invalid parcel weight");
    case "special":
      return parcel.weight > 0 && parcel.description !== ""
        ? Right(parcel)
        : Left("invalid parcel description");
    default: {
      const _exhaustiveCheck: never = parcel;
      return Left("invalid parcel type");
    }
  }
};

const sendParcel = (parcel: ParcelWithCourier): string => {
  return `${parcel.parcelType} sent, courier: ${parcel.courierId}`;
};

export const main = (parcel: Parcel) =>
  validateParcel(parcel)
    .map(setCourier(123))
    .cata({
      onLeft: (error) => console.log("done", error),
      onRight: sendParcel,
    });
