// src/presentation/dtos/subscriber-request.dto.ts

import { IsNotEmpty, IsString } from "class-validator";
import { ISubscriber, emptySubscriber } from "../../domain/models/subscriber";
import { nanoid } from "nanoid";

export class SubscriberRequestDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  constructor(data: ISubscriber) {
    this.email = data.email;
  }

  toData(): ISubscriber {
    return {
      ...emptySubscriber,
      id: nanoid(10),
      email: this.email,
    };
  }

  toUpdateData(data: ISubscriber): ISubscriber {
    return {
      id: data.id,
      email: data.email,
    };
  }
}
