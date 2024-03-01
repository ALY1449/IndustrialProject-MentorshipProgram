import { UserState } from "./user";

interface Mentee extends UserState{
    age: number,
    undergrad_or_grad?: boolean,
    postgrad?: boolean,
    professional?: boolean;
}

export default Mentee;