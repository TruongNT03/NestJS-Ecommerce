export class PaymentRequestItemDto {
  name: string;

  quantity: number;

  price: number;

  unit: string;

  taxPercentage: number;
}

export class PaymentRequestInvoice {
  buyerNotGetInvoice: boolean;

  taxPercentage: number;
}

export class PaymentRequestDto {
  orderCode: number;

  amount: number;

  description: string;

  buyerName: string;

  buyerCompanyName: string;

  buyerTaxCode: string;

  buyerAddress: string;

  buyerEmail: string;

  buyerPhone: string;

  items: PaymentRequestItemDto[];

  cancelUrl: string;

  returnUrl: string;

  invoice: PaymentRequestInvoice;

  expiredAt: number;

  signature: string;
}
