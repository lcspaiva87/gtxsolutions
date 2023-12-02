
import clsx from 'clsx'

export type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  // eslint-disable-next-line no-use-before-define
  variant?: Variant
  children?: React.ReactNode
  // eslint-disable-next-line no-use-before-define
  type?: Type
  disabled?: boolean
  icon?: string
}

type Type = 'button' | 'submit'

type Variant = 'primary' | 'ghost'

const defaultClassName = 'text-label'

export const primaryClassName =
  'border-secondary-300 bg-gray-700 border text-secondary-100 border-secondary-300 rounded-md  disabled:bg-gray-700 text-white py-2 px-[26.5px] rounded-sm hover:bg-gray-600 hover:text-gray-100  '
const ghostClassName =
  'bg-transparent hover:underline active:text-secondary-900 transition-colors'

const Button = ({
  onClick,
  className,
  variant = 'primary',
  type = 'button',
  disabled,
  children,
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        defaultClassName,
        {
          [primaryClassName]: variant === 'primary',
          [ghostClassName]: variant === 'ghost',
        },
        className,
      )}
    >
      {children}
    </button>
  )
}

export default Button
