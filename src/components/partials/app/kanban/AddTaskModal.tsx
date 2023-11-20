import FormGroup from '@/components/ui/FormGroup'
import Modal from '@/components/ui/Modal'
import Textarea from '@/components/ui/Textarea'
import Textinput from '@/components/ui/Textinput'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import Flatpickr from 'react-flatpickr'
import { Controller, useForm } from 'react-hook-form'
import Select, { components } from 'react-select'
import * as yup from 'yup'
import kabanStore from './store'
const styles = {
  multiValue: (base:any, state:any) => {
    return state.data.isFixed ? { ...base, opacity: '0.5' } : base
  },
  multiValueLabel: (base:any, state:any) => {
    return state.data.isFixed
      ? { ...base, color: '#626262', paddingRight: 6 }
      : base
  },
  multiValueRemove: (base:any, state:any) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base
  },
  option: (provided:any, state:any) => ({
    ...provided,
    fontSize: '14px',
  }),
}

const assigneeOptions = [
  {
    value: 'mahedi',
    label: 'Mahedi Amin',
    image: '/assets/images/avatar/av-1.svg',
  },
  {
    value: 'sovo',
    label: 'Sovo Haldar',
    image: '/assets/images/avatar/av-2.svg',
  },
  {
    value: 'rakibul',
    label: 'Rakibul Islam',
    image: '/assets/images/avatar/av-3.svg',
  },
  {
    value: 'pritom',
    label: 'Pritom Miha',
    image: '/assets/images/avatar/av-4.svg',
  },
]
const options = [
  {
    value: 'team',
    label: 'team',
  },
  {
    value: 'low',
    label: 'low',
  },
  {
    value: 'medium',
    label: 'medium',
  },
  {
    value: 'high',
    label: 'high',
  },
  {
    value: 'update',
    label: 'update',
  },
]
const OptionComponent = ({ data, ...props }:any) => {
  // const Icon = data.icon;

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  )
}
export const AddTaskModal = () => {
  const {toggleTaskModal,taskModal} = kabanStore()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const FormValidationSchema = yup
    .object({
      title: yup.string().required('Title is required'),
      assign: yup.mixed().required('Assignee is required'),
      tags: yup.mixed().required('Tag is required'),
      startDate: yup
        .date()
        .required('Start date is required')
        .min(new Date(), 'Start date must be greater than today'),
      endDate: yup
        .date()
        .required('End date is required')
        .min(new Date(), 'End date must be greater than today'),
    })
    .required()

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: 'all',
  })

  const onSubmit = (data:any) => {
  toggleTaskModal( false)
  }

  return (
    <div>
      <Modal
        title="Create Project"
        labelClass="btn-outline-dark"
        activeModal={taskModal}
        onClose={() =>
            toggleTaskModal( false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="title"
            label="Project Name"
            placeholder="Project Name"
            register={register}
            error={errors.title}
          />

          <div className="grid lg:grid-cols-2 gap-4 grid-cols-1">
            <FormGroup
              label="Start Date"
              id="default-picker"
              error={errors.startDate}
            >
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control py-2"
                    id="default-picker"
                    placeholder="yyyy, dd M"
                    value={startDate}
                    onChange={(date) => {
                      field.onChange(date)
                    }}
                    options={{
                      altInput: true,
                      altFormat: 'F j, Y',
                      dateFormat: 'Y-m-d',
                    }}
                  />
                )}
              />
            </FormGroup>
            <FormGroup
              label="End Date"
              id="default-picker2"
              error={errors.endDate}
            >
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control py-2"
                    id="default-picker2"
                    placeholder="yyyy, dd M"
                    value={endDate}
                    onChange={(date) => {
                      field.onChange(date)
                    }}
                    options={{
                      altInput: true,
                      altFormat: 'F j, Y',
                      dateFormat: 'Y-m-d',
                    }}
                  />
                )}
              />
            </FormGroup>
          </div>
          <div className={errors.assign ? 'has-error' : ''}>
            <label className="form-label" htmlFor="icon_s">
              Assignee
            </label>
            <Controller
              name="assign"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={assigneeOptions}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  isMulti
                  components={{
                    Option: OptionComponent,
                  }}
                  id="icon_s"
                />
              )}
            />
            {errors.assign && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {/* {errors.assign?.message || errors.assign?.label.message} */}
              </div>
            )}
          </div>
          <div className={errors.tags ? 'has-error' : ''}>
            <label className="form-label" htmlFor="icon_s">
              Tag
            </label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  styles={styles}
                  className="react-select"
                  classNamePrefix="select"
                  isMulti
                  id="icon_s"
                />
              )}
            />
            {errors.assign && (
              <div className=" mt-2  text-danger-500 block text-sm">
                {/* {errors.tags?.message || errors.title?.label.message} */}
              </div>
            )}
          </div>
          <Textarea label="Description" placeholder="Description" />
          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
