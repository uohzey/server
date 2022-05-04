import Joi from "joi";

const name = Joi.string().required()
const alias = Joi.string().alphanum().required()

const add_cate_schema = {
    body: {
        name,
        alias,
    }
}

const id = Joi.number().integer().min(1).required()

const delete_cate_schema = {
    params: {
        id,
    }
}
//验证规则对象
const get_cate_schema = {
    params: {
        id,
    }
}

export { add_cate_schema, delete_cate_schema, get_cate_schema }