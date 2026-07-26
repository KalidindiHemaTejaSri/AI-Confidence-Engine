function Loading(){

    return(

        <div className="bg-white rounded-3xl shadow-lg p-10 h-full flex flex-col justify-center items-center">

            <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-600 border-t-transparent"></div>

            <h2 className="text-3xl font-bold mt-8">

                AI is analyzing reviews...

            </h2>

            <p className="text-gray-500 mt-4">

                Extracting insights...

            </p>

        </div>

    )

}

export default Loading;