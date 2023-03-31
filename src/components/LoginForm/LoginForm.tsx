import React from 'react'
import { useForm } from 'react-hook-form'

import { SignInFormData } from '@/types'

type SignInFormProps = {
  onSubmit: (data: SignInFormData) => void
  onCancel: () => void
}

const LoginForm: React.FC<SignInFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>()

  return (
    <form
      className="max-w-xl px-4 py-4 m-auto mt-8 border rounded md:py-4 md:px-8 border-slate-300"
      onSubmit={handleSubmit(onSubmit)}>
      <p className="flex items-center gap-4 mt-4 first-of-type:mt-0">
        <label className="font-medium text-gray-600" htmlFor="username">
          Username
        </label>
        <input
          className="w-full input"
          {...register('username', { required: true })}
          name="username"
          id="username"
          type="text"
          placeholder="user"
        />
      </p>
      {errors?.username?.type === 'required' && (
        <p className="text-red-500">Username is required</p>
      )}
      <p className="flex items-center gap-4 mt-4 first-of-type:mt-0">
        <label className="font-medium text-gray-600" htmlFor="password">
          Password
        </label>
        <input
          className="w-full input"
          {...register('password', { required: true })}
          name="password"
          id="password"
          type="password"
          placeholder="user"
        />
      </p>
      {errors?.password?.type === 'required' && (
        <p className="text-red-500">Password is required</p>
      )}

      <div className="flex gap-2 mt-4">
        <button type="submit" className="button button-filled">
          Submit
        </button>
        <button type="button" className="text-orange-500 button button-outlined" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default LoginForm
