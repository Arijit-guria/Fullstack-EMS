import React from 'react'
import LoginLeftSide from './LoginLeftSide'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, EyeOffIcon,EyeIcon, Loader2Icon } from 'lucide-react'
import { useState } from 'react'

const LoginForm = ({role,title,subtitle}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const[showPassword,setShowPassword] = useState(false)
    const[error,setError] = useState('')
    const[loading,setLoading] = useState(false)

    const handleSubmit = async (e) => {e.preventDefault();
    }
  return (
    <div className="min-h-screen flex flex-col  md:flex-row">
        <LoginLeftSide/>
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
            <div className="w-full max-w-md animate-fade-in">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 mb-10 transition-colors">
        <ArrowLeftIcon size={16}/>Back to portals
        </Link>
        <div className="mb-8">
            <h1 className="text-2xl font-medium text-zinc-800 sm:text-3xl">{title}</h1>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
                {subtitle}
            </p>
        </div>
        {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 iems-start gap-3 border border-rose-200">
                <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
                {error}</div>)}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label  className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter your email" />
                    </div>
                    
                    <div>
                        <label  className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                        <div className="relative">
                        <input type={showPassword ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} required className='pr-11' placeholder="Enter your password" />
                        <button type="button" className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" onClick={()=>setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOffIcon size={18}/> : <EyeIcon size={18}/> }
                        </button>
                        </div>
                        
                    </div>
                    <button type="submit" disabled={loading }className="w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm rounded-md hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50 transition-all duration-200 shadow-lg shadow-indigo-500/25 active:scale[0.98] flex items-center justify-center ">
                    {loading && <Loader2Icon className="animate-spin h-4 w-4 mr-2"/>}

                        Sign In
                    </button>
                </form>
      </div>
      </div>
        
    </div>
  )
}

export default LoginForm
