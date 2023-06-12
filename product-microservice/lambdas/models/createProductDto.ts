import {ValidationRule} from "../validator";
import {Type} from "../validator/rules/Type";
import {IsRequired} from "../validator/rules/IsRequired";

type CreateProductDto = {
    title: string;
    description: string;
    price: number;
    count: number;
};

const validationRules: Record<keyof CreateProductDto, ValidationRule[]> = {
    title: [new IsRequired(), new Type('string')],
    description: [new IsRequired(), new Type('string')],
    price: [new IsRequired(), new Type('number')],
    count: [new IsRequired(), new Type('number')],
};

export { CreateProductDto, validationRules };
