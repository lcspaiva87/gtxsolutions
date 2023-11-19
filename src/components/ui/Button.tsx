/* eslint-disable */
import clsx from 'clsx'

export type Props = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  className?: string
  // eslint-disable-next-line no-use-before-define
  variant?: Variant
  children: React.ReactNode
  // eslint-disable-next-line no-use-before-define
  type?: Type
  disabled?: boolean
}

type Type = 'button' | 'submit'

type Variant = 'primary' | 'ghost'

const defaultClassName = 'text-label'

export const primaryClassName =
  'bg-gray-900 disabled:bg-gray-700 text-white py-2 px-[26.5px] rounded-sm hover:bg-gray-700  active:bg-primary-600 transition-colors focus:outline-none focus-visible:ring focus-visible:ring-secondary'
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
