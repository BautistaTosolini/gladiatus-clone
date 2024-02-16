'use client'

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInUser } from '@/lib/actions/user/signIn.action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const payload = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const response = await signInUser(payload);

    if (response && response.error) return toast.error(response.error.message);

    router.push('/game/overview');
  }

  return (
    <form action={handleSubmit} className='space-y-3'>
      <div>
        <Label>Email</Label>
        <Input
          name='email'
          className='bg-cream border-none'
          type='email'
          placeholder='Enter your e-mail...' 
        />
      </div>
      
      <div>
        <Label>Password</Label>
        <Input
          name='password'
          className='bg-cream border-none'
          type='password'
          placeholder='Enter your password...' 
        />
      </div>

      <div className='flex justify-center gap-4'>
        <Button 
          className='general-button w-full font-semibold hover:brightness-110 hover:bg-brown text-brown2'
          type='button'
          onClick={() => router.push('/')}
        >
          Return
        </Button>
        <Button 
          type='submit'
          className='general-button w-full font-semibold hover:brightness-110 hover:bg-brown text-brown2'
        >
          Send
        </Button>
      </div>
      <span className='text-sm flex justify-center'>
        Don't have an account?
          <Link 
            className='text-red cursor-pointer mx-1'
            href='/sign-up'
          >
            Sign Up
          </Link> 
        here.
      </span>
    </form>
  )
}

export default SignIn;