import { Injectable, Module, Inject } from '@nestjs/common';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../ioc/types.ioc';
import { CartRepository } from '../repositories/base.repository';
import { ICartRepository } from '../repositories/interface.repository';

@Injectable()
export class CartUsecase {
  constructor(
    @inject(TYPES.CartRepository)
    private readonly CartRepository: ICartRepository,
  ) {}

  async getAll(userId: UniqueId) {
    const result = await this.CartRepository.getAll(userId);

    return result;
  }

  async add(userId: UniqueId, productId: UniqueId) {
    const result = await this.CartRepository.add(userId, productId);

    return result;
  }

  async removeAll(userId: UniqueId) {
    const result = await this.CartRepository.removeAll(userId);

    return result;
  }

  async removeOne(userId: UniqueId, cartId: UniqueId) {
    const result = await this.CartRepository.removeOne(userId, cartId);

    return result;
  }

  async changeAmount(userId: UniqueId, cartId: UniqueId, value: number) {
    const result = await this.CartRepository.changeAmount(
      userId,
      cartId,
      value,
    );

    return result;
  }
}
