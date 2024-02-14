import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SignIn from '@/components/forms/SignIn';

const Page = () => {
  return (
    <Card className='w-[350px] rounded-sm cream-card'>
      <CardHeader>
        <CardTitle>Sing In</CardTitle>
        <CardDescription className='text-red'>Gladiatus Clone</CardDescription>
      </CardHeader>
      <CardContent>
        <SignIn />
      </CardContent>
    </Card>
  )
};

export default Page;