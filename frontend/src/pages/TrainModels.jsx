import React from 'react'
import Result from '../components/app2/Result'

function TrainModels() {
    

  return (
    <main className='w-full min-h-screen bg-gradient-to-t from-yellow-100 to to-blue-100'>
        <div className='shadow-2xl  shadow-white h-min-full capitalize bg-yellow-50 font-extrabold text-9xl max-sm:text-5xl max-lg:text-6xl
         p-8 text-center text-blue-400 items-center justify-center hover:border-blue-300'>
            <h1 className='leading-[1.3] '>Fine tune Gemma2 models without any code and download your checkpoints</h1>
        </div>
        <div className='flex justify-between gap-2 p-8 text-xl w-full max-lg:flex-col '>
            <div className='border-8 flex flex-col gap-8 p-8 w-1/2 max-lg:w-full'>
                <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                    <label>Choose Model</label>
                    <select className='w-1/2 p-2'>
                        <option>Gemma2B</option>
                        <option>Gemma9B</option>
                        <option>Gemma27B</option>
                    </select>
                </div>
                <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                    <label>Choose Task</label>
                    <select className='w-1/2 p-2'>
                        <option>Classification</option>
                        <option>Extractive Question Answering</option>
                        <option>Chatbots</option>
                        <option>Translation</option>
                        
                    </select>
                </div>
                <div className='flex flex-col gap-2 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 items-center '>
                    <div className='flex gap-4 justify-center'>
                    <label>Upload Dataset</label>
                    <input type='file' className='w-1/2' />
                    </div>
                    <h3 className='font-light text-neutral-600 hover:text-black'>The file format should be in .json. <a className='text-red-700' href="https://github.com/mahdertesf/LLM-Fine-tunning-Data-Format" >see this file for more detail</a> </h3>
                </div>
                <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                    <label>Number of Epochs</label>
                    <input type='number' className='w-1/2 p-2' />
                </div>
                <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                    <label >Batch Size</label>
                    <input type='number' min={1} max={16} className='w-1/2 p-2' />
                </div>
                <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                    <label>Learning Rate</label>
                    <input type='number' className='w-1/2 p-2' />
                </div>
           
                
                <div className='flex gap-4 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-between'>
                    <label>Validation Split Size</label>
                    <input type='number' className='w-1/2 p-2' min={0} max={1} placeholder='use value between 0 and 1' />
                    
                </div>
                <div className='flex flex-col gap-2 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 items-center'>
                    <div className='flex gap-4'>
                    <label>Early Stoping</label>
                    <input type="checkbox"  /> 
                    </div>
                    <h3 className='font-light text-neutral-600 hover:text-black'>recommended to be checked </h3> 
                </div>
                <div className='flex flex-col gap-2 w-full bg-red-100 p-6 rounded-3xl hover:bg-blue-400 justify-around items-center'>
                    <div className='flex gap-4 '>
                    <label>Save Best Model</label>
                    <input type="checkbox" />
                    </div>
                    <h3 className='font-light text-neutral-600 hover:text-black'>recommended to be checked </h3> 
                </div>
                <div className='bg-yellow-400 p-2 rounded-3xl mt-3 text-center w-full'>
                    <button>Train</button>
                </div>

            </div>
            <div className='border-8 self-start p-8 w-1/2 max-lg:w-full '>
                <h1 className='text-center'>Result</h1>
                <Result/>

            </div>

        </div>
    </main>
  )
}

export default TrainModels