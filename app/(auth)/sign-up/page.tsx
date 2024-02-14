import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignUp from '@/components/forms/SignUp';

const Page = () => {
  return (
    <Card className='w-[350px] rounded-sm cream-card'>
      <CardHeader>
        <CardTitle>Sing Up</CardTitle>
        <CardDescription className='text-red'>Gladiatus Clone</CardDescription>
      </CardHeader>
      <CardContent>
        <SignUp />
      </CardContent>
    </Card>
  )
};

export default Page;