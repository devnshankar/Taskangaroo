import * as React from "react"

// import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <Input
        suffix={ showPassword ? <EyeIcon onClick={ () => { setShowPassword(false) } } /> : <EyeOffIcon onClick={ () => { setShowPassword(true) } } /> }
        type={ showPassword ? "text" : "password" }
        className={ className } { ...props } ref={ ref }
      />
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }