import { ApiProperty } from '@nestjs/swagger';

import { 
    BeforeInsert, 
    BeforeUpdate, 
    Column, 
    Entity, 
    ManyToOne, 
    OneToMany, 
    PrimaryGeneratedColumn 
} from 'typeorm';

import { ProductImage } from './';
import { User } from '../..//auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '00ee8725-cf32-4ad0-9d02-891e868ca1ab',
        description: 'Product ID',
        uniqueItems: true,
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'Green Hat',
        description: 'Product title',
        uniqueItems: true,
    })
    @Column('text', { unique: true })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price',
    })
    @ApiProperty()
    @Column('float', { default: 0 })
    price: number;

    @ApiProperty({
        example: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.',
        description: 'Product description',
    })
    @Column('text', { nullable: true })
    description: string;

    @ApiProperty({
        example: 'green-hat',
        description: 'Product slug for SEO',
        uniqueItems: true,
    })
    @Column('text', { unique: true })
    slug: string;

    @ApiProperty({
        example: 300,
        description: 'Product stock',
        default: 0
    })
    @Column('int', { default: 0 })
    stock: number;
    
    @ApiProperty({
        example: ['X', 'M', 'L'],
        description: 'Product sizes',
    })
    @Column('text', { array: true })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    })
    @Column('text')
    gender: string;

    @ApiProperty({
        example: ['hat', 'green', 'summer'],
        description: 'Product tags',
    })    @Column('text', { array: true, default: [] })
    tags: string[];

    @OneToMany(
        () => ProductImage,
        productImage => productImage.product, {
            cascade: true,
            eager: true
        }
    )
    images?: ProductImage[];

    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User;

    @BeforeInsert()
    checkSlugInsert() {
        if(!this.slug) {
            this.slug = this.title;
        } 
        
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '-')
            .replaceAll("'", '')
    }
}
