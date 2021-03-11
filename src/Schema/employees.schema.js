// MODIFICAR ...
const { Schema } = require('mongoose');
const joi = require('joi');
const message = require('../libs/message');
const mongoosePaginate = require('mongoose-paginate-v2');

const employeeSchema = new Schema (
    {
        name: {type: String, required: true, unique: true},
        position: {type: String, required: true},
        office: {type: String, required: true},
        salary: {type: Number, required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

employeeSchema.plugin(mongoosePaginate);

employeeSchema.validaSchema = joi.object({
    name: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Name";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Name Valido";                                             
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    position: joi.string()
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar una Position";                        
                        break;
                    case "string.empty":                        
                        err.message = "Debe ingresar una Position Valida";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),

    office: joi.string()  
        .trim()
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":
                        err.message = "Debe ingresar un Office";                        
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Office Valido";                        
                        break;
                    default:
                        break;
                }
            });

            return errors;
        }),
    
    salary: joi.number()
        .integer()
        // .min(0)
        // .max(10)
        .required()
        .error(errors => {
            errors.forEach(err => {
                console.log(message.disconnected(err));
                console.log(message.disconnected(err.code));

                switch (err.code) {
                    case "any.required":  
                        err.message = "Debe ingresar un Salary";
                        break;
                    case "string.empty":
                        err.message = "Debe ingresar un Salary Valido";                                             
                        break;
                    case "number.base":
                        err.message = "El Salary debe ser un numero Entero Valido";                                             
                        break;
                    /* case "number.min":
                        err.message = "El Salary debe tener un valor Minimo de 0";                        
                        break;
                    case "number.max":
                        err.message = "El Salary debe tener un valor Maximo de 10";                        
                        break; */
                    default:
                        break;
                }
            });

            return errors;
        })
});

module.exports = employeeSchema;