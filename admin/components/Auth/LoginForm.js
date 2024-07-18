import { useForm } from "react-hook-form";
import { login } from "@/state/Auth/Action"
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function LoginForm() {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    dispatch(login(data))
  }
  return (
    <div id='root'>
      <section className="bg-gray-200 dark:bg-gray-900">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
          <div className=" bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md min-w-[512px] xl:p-0">
            <div className="w-full p-6 space-y-4 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form className="md:space-y-6" onSubmit={handleSubmit(onSubmit)} action="#">
                <div>
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">Username</label>
                  <input {...register("usernameOrEmail")} required type="text" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your username" />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-900 dark:text-white">Password</label>
                  <input {...register("password")} required type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>

                <button type="submit" className="w-full px-5 py-3 mt-6 text-lg font-semibold text-center text-white bg-gray-500 rounded-lg hover:bg-gray-400">Login</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}
