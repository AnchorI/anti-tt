import Joi from "joi"
import dotenv from "dotenv"

dotenv.config()

type Config = {
    token: string
}

const envVarsSchema = Joi.object({
    TOKEN: Joi.string().required().description("Secret token required to sign")
})
    .unknown()
    .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

const config: Config = {
    token: envVars.TOKEN
}

export default config
