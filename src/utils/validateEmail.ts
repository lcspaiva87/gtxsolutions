// ts-ignore
const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

type Options = {
  required?: boolean
}

export const validateEmailFormat = (
  email: string,
  options?: Options,
): { ok: true; email: string } | { ok: false; error: string } => {
  if (options?.required && (!email || email.trim().length === 0)) {
    return { ok: false, error: 'Email is required' }
  }

  if (email && !email.match(emailRegex)) {
    return { ok: false, error: 'Invalid email format' }
  }

  return { ok: true, email }
}
