'use client'

import Link from 'next/link';
import toast from 'react-hot-toast';
import { signUp } from '@/lib/utils/user.utils';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Page = () => {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    await signUp(formData)
      .then((response) => {
        console.log(response)
        toast.success(response);
        router.push('/home')
      })
      .catch((error) => {
        toast.error(error.message)
      });
  }

  return (
    <Card className='w-[350px] rounded-sm cream-card'>
      <CardHeader>
        <CardTitle>Sing Up</CardTitle>
        <CardDescription className='text-red'>Gladiatus Clone</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-3'>

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
      </CardContent>
    </Card>
  )
};

export default Page;