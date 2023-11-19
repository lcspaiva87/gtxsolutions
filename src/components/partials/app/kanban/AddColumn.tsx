import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Modal from '@/components/ui/Modal'
import Textinput from '@/components/ui/Textinput'

import { useColumns } from '@/hooks/useColuns'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import kabanStore from './sto'
type FormValues = {
  name: string
  color: string
}
const FormValidationSchema = yup
  .object({
    name: yup.string().required('name is required'),
    color: yup.string().required('color is required'),
  })
  .required()

const AddColumn = () => {
  const [color, setColor] = useState('#4669fa')
  const { columModal, toggleColumnModal } = kabanStore()
  const { createMutation } = useColumns()
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: 'all',
  })
  console.log(errors)
  const onSubmit = ({ color, name }: FormValues) => {
    const id = `container-${uuidv4()}`
    createMutation.mutate({ name, color, id })

    toggleColumnModal(false)
    reset()
  }

  return (
    <div>
      <Modal
        title="Create New Column"
        labelclassName="btn-outline-dark"
        activeModal={columModal}
        onClose={() => toggleColumnModal(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            label="Column Name"
            placeholder="Column Name"
            register={register}
            {...register('name', { required: 'Name is required' })}
            error={errors.name}
          />
          <div className="formGroup">
            <label className="form-label">Select Color</label>
            <input
              required
              {...register('color', { required: 'Color is required' })}
              onChange={(e) => setColor(e.target.value)}
              type="color"
              className="form-control"
              value={color}
            />
          </div>

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddColumn
