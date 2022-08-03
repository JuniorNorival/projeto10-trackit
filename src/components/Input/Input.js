export default function Input({name, button, handleForm}) {
   
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
                })
            } />
    )
}