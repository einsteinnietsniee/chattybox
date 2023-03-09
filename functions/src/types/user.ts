type TRole = 'owner' | 'admin' | 'supervisor' | 'agent';

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: TRole[];
}

export interface IOrganization {
  name: string;
}

export interface IUserCreateArgs {
  user: IUser;
  organization: IOrganization
}
