function AIAnalysis({ analysis }) {

    return (

        <div className="space-y-6">

            {/* Confidence */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

                <h2 className="text-2xl font-bold">

                    AI Confidence Score

                </h2>

                <div className="flex justify-center mt-8">

                    <div className="w-40 h-40 rounded-full border-[10px] border-pink-600 flex flex-col justify-center items-center">

                        <h1 className="text-5xl font-bold text-pink-600">

                            {analysis.confidence}%

                        </h1>

                        <p className="text-gray-500">

                            Confidence

                        </p>

                    </div>

                </div>

            </div>

            {/* Recommendation */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

                <h2 className="font-bold text-xl">

                    Recommendation

                </h2>

                <div className="mt-4 bg-green-100 text-green-700 rounded-xl p-4">

                    ✅ {analysis.recommendation}

                </div>

            </div>

            {/* Summary */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

                <h2 className="font-bold text-xl">

                    AI Summary

                </h2>

                <p className="mt-4 text-gray-600 leading-7">

                    {analysis.summary}

                </p>

            </div>

            {/* Pros */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

                <h2 className="font-bold text-xl text-green-700">

                    👍 Pros

                </h2>

                <ul className="mt-4 space-y-2">

                    {analysis.pros.map((item,index)=>(

                        <li key={index}>

                            ✔ {item}

                        </li>

                    ))}

                </ul>

            </div>

            {/* Cons */}

            <div className="bg-white rounded-3xl shadow-lg p-6">

                <h2 className="font-bold text-xl text-red-600">

                    👎 Cons

                </h2>

                <ul className="mt-4 space-y-2">

                    {analysis.cons.map((item,index)=>(

                        <li key={index}>

                            ✖ {item}

                        </li>

                    ))}

                </ul>

            </div>

        </div>

    )

}

export default AIAnalysis;