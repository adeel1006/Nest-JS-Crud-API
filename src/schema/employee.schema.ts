import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumberString,
  IsEnum,
} from 'class-validator';
import { Document } from 'mongoose';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export type EmployeeDocument = Employee & Document;
@Schema()
export class Employee {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  FirstName: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  LastName: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  Designation: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  Email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  Address: string;

  @Prop({ required: true })
  @IsNumberString()
  @IsNotEmpty()
  Salary: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @IsEnum(Gender)
  Gender: Gender;;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
