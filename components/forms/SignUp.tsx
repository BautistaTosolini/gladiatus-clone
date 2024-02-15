'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignUpUser } from '@/lib/actions/user/signUp.action';
import toast from 'react-hot-toast';

const SignUp = () => {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      repeatedPassword: formData.get('repeatedPassword') as string,
    }

    await SignUpUser(payload)
      .then(() => {
        router.push('/game/overview');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <form action={handleSubmit} className='space-y-3'>
      <div>
        <Label>Name</Label>
        <Input
          name='name'
          className='bg-cream border-none'
          type='text'
          placeholder='Enter your name...' 
        />
      </div>

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

      <div>
        <Label>Confirm Password</Label>
        <Input
          name='repeatedPassword'
          className='bg-cream border-none'
          type='password'
          placeholder='Repeat your password...' 
        />
      </div>

      <div className='flex justify-center gap-4'>
        <Button 
          className='bg-red text-cream2 font-semibold hover:bg-red2 w-full'
          type='button'
          onClick={() => router.push('/')}
        >
          Return
        </Button>
        <Button 
          type='submit'
          className='bg-red text-cream2 font-semibold hover:bg-red2 w-full'
        >
          Send
        </Button>
      </div>
      <span className='text-sm flex justify-center'>
        Already have an account?
          <Link 
            className='text-red cursor-pointer mx-1'
            href='/sign-in'
          >
            Sign In
          </Link> 
        here.
      </span>
    </form>
  )
}

export default SignUp;