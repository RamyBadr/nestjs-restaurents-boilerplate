import { SetMetadata } from '@nestjs/common';

export const Strategies = (...strategies: string[]) => SetMetadata('strategies', strategies);
