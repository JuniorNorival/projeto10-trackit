import { handleForm } from '../../helpers/loginFunctions'
export default function Input({name, button, form,setForm}) {
   console.log(form)
    return (
        <input type={name ==='image' ? 'text':name}
            name={name}
            placeholder={name ==='image' ? 'foto':name}
            disabled={button}
            required
            onChange={(e) =>
                handleForm({
                    name: e.target.name,
                    value: e.target.value,
                    form:form,
                    setForm:setForm}
                     )} />
    )
}