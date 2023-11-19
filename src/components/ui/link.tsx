import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const Link: React.FC<
  NextLinkProps & { className?: string; title?: string; children?: any }
> = ({ className, children, ...props }) => {
  return (
    // <Tooltip content={String(props.href)?.replace(/\//g, '')} align="center" >
    <NextLink {...props}>
      <h5 className={className}>{children}</h5>
    </NextLink>
    // </Tooltip>
  )
}

export default Link
