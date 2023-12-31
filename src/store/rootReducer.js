import calendar from '@/components/partials/app/calender/store'
import email from '@/components/partials/app/email/store'
import project from '@/components/partials/app/projects/store'
import todo from '@/components/partials/app/todo/store'
import auth from '@/components/partials/auth/store'
import layout from './layoutReducer'
const rootReducer = {
  layout,
  todo,
  email,

  project,
  calendar,
  auth,
}
export default rootReducer
