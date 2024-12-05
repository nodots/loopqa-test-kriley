const basicFormFields = () => {
  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="_name"
        name="name"
        required={true}
        defaultValue={'Ken Riley'}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="_email"
        name="email"
        required={true}
        defaultValue={'kenr@nodots.com'}
      />
      <button type="submit">Submit</button>
    </>
  )
}

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  children?: React.ReactNode
}
const Form = ({ onSubmit, children }: Props) => {
  return (
    <form
      style={{ display: 'flex', flexDirection: 'column' }}
      onSubmit={onSubmit}
    >
      {children ? children : basicFormFields()}
    </form>
  )
}

export default Form
