import Input from '../common/Input';
import Joi from 'joi-browser';
export function renderButton(label,handleSubmit) {
    return (
        <div className="buttonClass">
            <button className="button" type="submit" onClick={handleSubmit}>{label}</button>
        </div>

    );
};

export function renderInput(name, title, type, handelChange, data, errors, icon) {
    return (
        <Input
            icon={icon}
            title={title}
            value={data[name]}
            id={name}
            name={name}
            type={type}
            handelChange={handelChange}
            error={errors[name]}
        />
    );
}

export function validateProperty({ name, value }, schema) {
    const obj = { [name]: value };
    const schem = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schem);
    return error ? error.details[0].message : null;
};

export function errorcheck({ currentTarget: input }, error, schema) {
    const errors = { ...error }
    const errorMessage = validateProperty(input, schema)
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    return errors;
}


export function validate(data, schema) {
    const result = Joi.validate(data, schema, { abortEarly: false });
    // console.log("result:"+result);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
}