import { Injectable, NotFoundException , BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee, EmployeeDocument } from '../schema/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeDocument> {
    
    const {FirstName, LastName, Designation , Email , Address , Salary} = createEmployeeDto;
    if(!FirstName ||!LastName ||!Designation ||!Email ||!Address ||!Salary){
      throw new BadRequestException('Please fill all fields');
    }
    const employee = new this.employeeModel(createEmployeeDto);
    return employee.save();
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeDocument> {
    const employee = await this.employeeModel
      .findByIdAndUpdate(id, updateEmployeeDto, { new: true })
      .exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }

  async remove(id: string) {
    const employee = await this.employeeModel.findByIdAndRemove(id).exec();
    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }
    return employee;
  }
}
