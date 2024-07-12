import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { login } from "@/state/Auth/Action"
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    dispatch(login(data))
  }
  return (
    // <div id='root'>

    //   <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-fig">
    //     <main className="flex items-center justify-center flex-1 h-screen px-20">
    //       <div className="flex flex-col w-1/3 p-2 bg-white rounded-lg min-h-max">
    //         <div className="mt-8 text-center">
    //           <p className="block text-3xl font-bold leading-normal">
    //             Đăng nhập
    //           </p>
    //         </div>

    //         <form className="m-6" onSubmit={handleSubmit(onSubmit)}>
    //           {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
    //           <label className="block font-bold leading-normal uppercase text-gray-logText">
    //             Tên đăng nhập
    //           </label>
    //           <input
    //             {...register("usernameOrEmail")}
    //             name="usernameOrEmail"
    //             className="w-full p-2 my-2 mb-5 border border-solid rounded-lg outline-none bg-gray-50"
    //             type="text"
    //             required
    //             placeholder="Nhập tên đăng nhập của bạn"
    //           ></input>

    //           <label className="block font-bold leading-normal uppercase text-gray-logText">
    //             Mật khẩu
    //           </label>
    //           <input
    //             {...register("password")}
    //             name="password"
    //             className="w-full p-2 my-2 mb-5 border border-solid rounded-lg outline-none bg-gray-50"
    //             type="password"
    //             required
    //             placeholder="Nhập mật khẩu của bạn"
    //           ></input>

    //           <button
    //             className="w-full py-3 my-4 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 bg-blue-original"
    //             type="submit"
    //           >
    //             Đăng nhập
    //           </button>
    //         </form>
    //       </div>
    //     </main>
    //   </div>
    // </div>
    <section class="bg-gray-200 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
        <div class=" bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md min-w-[512px] xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 w-full">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Đăng nhập 
            </h1>
            <form class="md:space-y-6" action="#">
              <div>
                <label for="email" class="block mb-2  font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
              </div>
              <div>
                <label for="password" class="block mb-2  font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
              </div>

              <button type="submit" class="w-full text-white font-semibold text-lg bg-gray-500 mt-6 py-3 hover:bg-gray-400 rounded-lg px-5 text-center">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
}
