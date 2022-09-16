import { ApiProperty } from '@nestjs/swagger';
import { 
    IsArray, 
    IsIn, 
    IsInt, 
    IsNumber, 
    IsOptional, 
    IsPositive, 
    IsString, 
    MinLength 
} from 'class-validator';

export class CreateProductDto {

    @ApiProperty({
        description: 'Product title',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        description: 'Product price',
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Product description',
        nullable: true,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ description: 'Product slug'})
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({ description: 'Product stock'})
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number; 

    @ApiProperty({ description: 'Product sizes'})
    @IsString({ each: true })
    @IsArray()
    sizes: string[]

    @ApiProperty({ description: 'Product gender'})
    @IsIn(['men','women','kid','unisex'])
    gender: string;

    @ApiProperty({ description: 'Product tags'})
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({ description: 'Product images'})
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

}
