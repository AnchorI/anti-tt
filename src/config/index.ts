import Joi from "joi"
import dotenv from "dotenv"

dotenv.config()

type Config = {
    token: string
    opg: string
    opgId: number
    piramida: string
    piramidaId: number
    di4ka: string
    di4kaId: number
}

const envVarsSchema = Joi.object({
    TOKEN: Joi.string().required().description("Secret token required to sign"),
    PIRAMIDA: Joi.string().required().description("PIRAMIDA CHAT MEMBERS"),
    PIRAMIDAID: Joi.number().required().description("PIRAMIDA  CHAT ID"),
    OPG: Joi.string().required().description("OPG CHAT MEMBERS"),
    OPGID: Joi.number().required().description("OPG CHAT ID"),
    DI4KA: Joi.string().required().description("DI4KA CHAT MEMBERS"),
    DI4KAID: Joi.number().required().description("DI4KA CHAT ID")
})
    .unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config: Config = {
    token: envVars.TOKEN,
    piramida: envVars.PIRAMIDA,
    piramidaId: envVars.PIRAMIDAID,
    opg: envVars.OPG,
    opgId: envVars.OPGID,
    di4ka: envVars.DI4KA,
    di4kaId: envVars.DI4KAID
}

export default config
