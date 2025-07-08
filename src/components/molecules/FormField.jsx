import Label from '@/components/atoms/Label'
import Input from '@/components/atoms/Input'

const FormField = ({ label, error, ...inputProps }) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input {...inputProps} />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export default FormField