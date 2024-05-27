export class CreateOrderItemDto {
  constructor(
    public readonly productId: string,
    public readonly amount: number,
  ) {}
}

export class CreateOrderDto {
  constructor(public readonly items: CreateOrderItemDto[]) {}
}
