'use client';

import { lusitana } from '@/app/ui/fonts';
import {
    AtSymbolIcon,
    KeyIcon,
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import {useFormState, useFormStatus} from 'react-dom';
import { authenticate } from '../lib/actions';
import Image from "next/image";
import {useRef} from "react";
import {signIn, signOut} from "../../auth";

export default function LoginForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleSubmit = async () => {
        console.log(emailRef.current)
        console.log(passwordRef.current)
    }

    return (
        <form action={dispatch} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
                {/*<h1 className={`${lusitana.className} mb-3 text-2xl`}>*/}
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                ref={emailRef}
                                onChange={(e: any) => {
                                    emailRef.current = e.target.value
                                }}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                required

                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                                ref={passwordRef}
                                onChange={(e: any) => (passwordRef.current = e.target.value)}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                required
                                minLength={6}
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
                <LoginButton emailRef={emailRef} passwordRef={passwordRef}/>

                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <>
                            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
            </div>
        </form>
    );
}

function LoginButton({emailRef, passwordRef}) {
    const { pending } = useFormStatus();
    const handleSubmit = async () => {
        console.log(emailRef.current)
        console.log(passwordRef.current)

        const result = await signIn("credentials", {
            username: emailRef.current,
            password: passwordRef.current,
            redirect: true,
            callbackUrl: "/",
        });
        console.log("result:"+result)
    }

    return (
        <div className="space-y-4">
            <Button className="mt-4 w-full"
                    aria-disabled={pending}
                    onClick={handleSubmit}
            >
                Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>
            <button
                className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
                onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/" })}
            >
                kakao login
            </button>
            <button className="mt-4 w-full"
                    // aria-disabled={pending}
                onClick={() => {
                    console.log("click naver login")
                    signIn("naver", { redirect: true, callbackUrl: "/" })
                }}
            >
                <Image src="/btn_naver_login.png" width={500} height={40} alt="naver login"/>
            </button>
        </div>

    );
}
