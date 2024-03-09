
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiProperty({
    description: 'Name of the user',
    type: String,
    example: 'John Doe'
  })
  name?: string;
  @ApiProperty({
    description: 'Email of the user',
    type: String,
    example: 'oldPassword'
  })
  oldPassword?: string;
  @ApiProperty({
    description: 'New password of the user',
    type: String,
    example: 'newPassword'
  })
  newPassword?: string;
}
