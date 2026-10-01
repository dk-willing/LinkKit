export default function Form() {
  return (
    <div className="py-4">
      <div className="bg-banner bg-cover rounded-xl bg-center p-4">
        <div className="py-5 w-full h-full backdrop-brightness-75 rounded-xl">
          <h3 className="text-4xl text-white text-center font-medium mb-3">
            Link-Kit
          </h3>
          <p className="text-center text-white font-extralight mb-4">
            Free Tool To Shorten Your URL
          </p>

          <form action="">
            <div className="flex">
              <div className="relative w-full">
                <div className="absolute flex items-center inset-0 ps-4 pointer-events-none">
                  <p>linkkit.in /</p>
                </div>
                <input
                  type="text"
                  placeholder="add your link"
                  required
                  className="block w-full bg-white ps-24 p-4 border-2 outline-none focus:ring-orange-700 focus:border-orange-700 rounded-lg active:border-orange-700"
                />

                <button
                  type="submit"
                  className="h-full absolute top-0 inset-e-0 cursor-pointer bg-orange-600/80 text-white p-2 flex items-center text-sm px-6 rounded-tr-lg rounded-br-lg active:scale-[99%]"
                >
                  Shorten URL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
