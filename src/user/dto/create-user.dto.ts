import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'User email', example: 'julian123@gmail.com', type: String })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User password', example: 'juan123', type: String })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ description: 'User name', example: 'Juan Perez', type: String })
    @IsString()
    name: string;
}
