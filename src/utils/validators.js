import * as Validators from '@vuelidate/validators'

const withMessage = Validators.helpers.withMessage

export const helpers = Validators.helpers

export const required = withMessage('Ce champs est obligatoire', Validators.required) 
export const email = withMessage('Format d\'adresse email incorrect', Validators.email) 
export const minLength = (value) => withMessage(`Minimum ${value} caractères`, Validators.minLength(value))
export const sameAs = (value) => withMessage('Cette valeur ne correspond pas celle désirée.', Validators.sameAs(value)) 

export const sameAsPassword = (password) => withMessage('Les deux mot de passe ne correspondent pas. ', Validators.sameAs(password)) 
export const sameAsTrue = withMessage('Merci d\'accepter les conditions', Validators.sameAs(true)) 

