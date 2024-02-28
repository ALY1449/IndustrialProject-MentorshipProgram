export interface UserState{
    fullName: string,
    age: string,
    emailAddress: string,
    password: string,
    mentor?: boolean
    mentee?: boolean,
    undergrad_or_grad?: boolean,
    postgrad?: boolean,
    professional?: boolean;
}
