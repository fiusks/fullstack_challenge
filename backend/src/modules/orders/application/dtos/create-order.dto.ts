export class CreateOrderItemDto {
  constructor(
    public readonly productId: string,
    public readonly amount,
  ) {}
}

export class CreateOrderDto {
  constructor(public readonly items: CreateOrderItemDto[]) {}
}
