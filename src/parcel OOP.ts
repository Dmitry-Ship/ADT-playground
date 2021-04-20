type Size = "XS" | "S" | "M" | "L" | "XL";

export interface IParcel {
  getType: () => string;
  validate: () => { isValid: boolean; errorMessage: string };
  setCourier: (courierId: number) => void;
  getCourier: () => number | null;
}

export interface IBigParcel {
  getSize: () => Size;
  getWeight: () => number;
}

abstract class BaseParcel implements IParcel {
  constructor(
    protected courierId: number | null = null,
    private type: string
  ) {}

  getType = () => this.type;
  validate = () => ({
    isValid: true,
    errorMessage: "",
  });

  setCourier = (courierId: number) => {
    if (this.validate().isValid) {
      this.courierId = courierId;
    } else throw Error(this.validate().errorMessage);
  };

  getCourier = () => this.courierId;
}

class Documents extends BaseParcel {
  constructor(courierId: number | null = null) {
    super(courierId, "document");
  }
  validate = () => ({
    isValid: true,
    errorMessage: "",
  });
}

class Box extends BaseParcel implements IBigParcel {
  constructor(
    private weight: number,
    private size: Size,
    courierId: number | null = null
  ) {
    super(courierId, "box");
  }

  validate = () => ({
    isValid: this.weight > 0,
    errorMessage: this.weight > 0 ? "" : "weight is invalid",
  });

  getSize = () => this.size;
  getWeight = () => this.weight;
}

class Special extends BaseParcel implements IBigParcel {
  constructor(
    private weight: number,
    private size: Size,
    private description: string,
    courierId: number | null = null
  ) {
    super(courierId, "special");
  }

  validate = () => ({
    isValid: this.weight > 0 && this.description !== "",
    errorMessage:
      this.weight > 0 && this.description !== "" ? "" : "weight is invalid",
  });

  getSize = () => this.size;
  getWeight = () => this.weight;
}

class Sender {
  constructor(private parcel: IParcel) {}

  send() {
    if (this.parcel.getCourier() === null) {
      throw Error("courier not set");
    }
    return console.log(
      `${this.parcel.getType()} parcel sent, courier: ${this.parcel.getCourier()}`
    );
  }
}

const main = (parcel: IParcel) => {
  if (!parcel.validate().isValid) {
    console.log(parcel.validate().errorMessage);
    return;
  }

  parcel.setCourier(123);
  const sender = new Sender(parcel);
  sender.send();
};
