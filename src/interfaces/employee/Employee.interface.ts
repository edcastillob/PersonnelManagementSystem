
import Department from '@/interfaces/employee/Department.interface';
import Position from '@/interfaces/employee/Position.interface'; 
import Ubication from '@/interfaces/employee/Ubication.interface'; 
import Role from '@/interfaces/employee/Role.interface'; 
import Status from '@/interfaces/employee/Status.interface'; 

export default interface Employee {
  id: number;
  dni: string;
  username: string;
  fullname: string;
  gender: string;
  birthdate: Date;
  civil_status: string;
  photo?: string | null;
  address: string;
  phone: string;
  email: string;
  department: Department;
  id_department: number;
  cargo: Position;
  id_cargo: number;
  start_date: Date;
  end_date?: Date | null;
  ubication: Ubication;
  id_ubication: number;
  role: Role;
  id_role: number;
  id_benefit: number;
  salary: number;
  benefit: string;
  social_security?: string;
  tax_identification?: string;
  education_level: string;
  educational_degree?: string;
  certifications?: string;
  blood_type?: string;
  allergic_to?: string;
  contact_information: string;
  status: Status;
  id_status: number;
  salary_changes?: SalaryChange[];
}




interface SalaryChange {
  id: number;
  id_employee: number;
  date: Date;
  edit_for: string;
  employee: Employee;
}