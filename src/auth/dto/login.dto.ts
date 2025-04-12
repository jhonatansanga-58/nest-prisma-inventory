import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
    @IsEmail()
    @ApiProperty({ description: 'Email', example: 'julian123@gmail.com', type: String })
    email: string;

    @IsString()
    @ApiProperty({ description: 'Password', example: 'juan123', type: String })
    password: string;
}
